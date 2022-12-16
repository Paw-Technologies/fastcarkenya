// const multer = require('multer')
// const sharp = require('sharp')
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory')


const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el]
    });
    return newObj;
}


// exports.getAllUsers = catchAsync(async(req, res, next) => {
//     const users = await User.find();

//     // SEND QUERY
//     res.status(200).json({
//         status: 'success',
//         results: users.length,
//         data: {
//             users,
//         },
//     });
// });

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

exports.deleteMe = catchAsync(async(req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false })

    res.status(204).json({
        status: 'success',
        data: null
    })
})


exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined! Please use /signup instead'
    })
}


exports.getUser = factory.getOne(User)

exports.getAllUsers = factory.getAll(User);

// Do not passwords with this
exports.updateUser = factory.updateOne(User)

exports.deleteUser = factory.deleteOne(User)