const crypto = require('crypto')
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);


    // res.cookie('jwt', token, {
    //     expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),

    //     httpOnly: true,
    //     secure: req.secure || req.headers['x-forwarded-proto'] === 'https'


    // });

    // Setting up cookies using jwt
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.signup = catchAsync(async(req, res, next) => {
    // const newUser = await User.create(req.body);
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country,
        city: req.body.city,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    })

    // const url = `${req.protocol}://${req.get('host')}/me`;
    // console.log(url)
    // await new Email(newUser, url).sendWelcome();


    createSendToken(newUser, 201, req, res);

    // const token = signToken(newUser._id)

    // res.status(201).json({
    //     status: 'success',
    //     token,
    //     data: {
    //         user: newUser
    //     }
    // })
});


exports.login = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;

    //  1) Check if email and password exists
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400))
    }
    //  2) Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');

    if(user === null) return next(new AppError("Account doesn't exist"))
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401))
    }

    //  3) if everything is ok send token to client
    createSendToken(user, 200, req, res);

    // const token = signToken(user._id);
    // res.status(200).json({
    //     status: 'success',
    //     token
    // })
});
exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
}

exports.protect = catchAsync(async(req, res, next) => {

    // 1) Getting token and check if its there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {

        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(new AppError('You are not  logged in! Please login to get access', 401))
    }
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('User no longer exists', 401))
    }
    // 4)Check if user changed password after token was ued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed pasword! Please log in', 401))
    }

    // GRANT ACCESS PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});

// Only for rendered pages and there will be no errors
exports.isLoggedIn = (async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            // 2) Check if user exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }

            // 3)Check if user changed password after token was issued
            if (currentUser.changedPasswordAfter(decoded.iat)) {
                return next()
            }

            // THERE IS A LOGGED IN USER
            res.locals.user = currentUser;
            return next();

        } catch (err) {
            return next();

        }
    }
    next()
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin']. role='user'
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permision to perform this action', 403)
            )
        };
        next();
    }
}


exports.forgotPassword = catchAsync(async(req, res, next) => {
    // 1) get user based on POSTed email
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new AppError('There is no user with this email address', 404));
    }

    // 2) Generate random reset token
    const resetToken = user.createPasswordResetToken();
    // console.log(resetToken)

    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

    try {

        await new Email(user, resetURL).sendPasswordReset();
        // console.log(resetURL)


        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });

    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        console.log(err)
        return next(new AppError('There was an error sending the email. Try again later'), 500)
    }
})


exports.resetPassword = catchAsync(async(req, res, next) => {
    // 1)Get user based on the token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });
    // 2)If token has not expired and their is user,set the new password
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400))
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3)Update changedPasswordAt property for the user

    // 4)Log the user in send JWT
    createSendToken(user, 200, req, res);

    // const token = signToken(user._id);
    // res.status(200).json({
    //     status: 'success',
    //     token
    // })
});

exports.updatePassword = catchAsync(async(req, res, next) => {
    // 1)Get user from collection
    const user = await User.findById(req.user.id).select('+password')

    // 2)Check if posted current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Your current password is wrong', 401))
    }

    // 3)If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // User.findByIdAndUpdate will not work as intended!

    // 4)Log user in, send JWT
    createSendToken(user, 200, req, res);
})