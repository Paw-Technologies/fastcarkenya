
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
const userRouter = require('./routes/userRoutes');
const productRouter =require('./routes/productRoutes');
const miscServer = require('./routes/miscRoutes');
const cloudinary = require('cloudinary').v2
const app = express();




app.use(cors({
    origin: "*",
}))

// configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET
})

// Development Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));

}

// Body parser,reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())




app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies)
    next();
})


app.use(express.static('./public/img/users/'))

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/products', miscServer)



// Error handling middlewares

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server`

    // })
    // const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // err.status = 'fail';
    // err.statusCode = 404;

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler)

module.exports = app;