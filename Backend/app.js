
const express = require('express');
const morgan = require('morgan');
const Payment = require('./models/paymentModel');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
const userRouter = require('./routes/userRoutes');
const productRouter =require('./routes/productRoutes')
const paymentRouter =require('./routes/paymentRoutes')
const app = express();



app.use(cors({
    origin: "*",
}))








// Development Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));

}







// Body parser,reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("You are home. Welcome")
});


app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies)
    next();
})




app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/payments', paymentRouter);

// app.post('/callback', (req, res) => {
    
//     const callbackData = req.body;
//     console.log(callbackData.Body);
//     if (!callbackData.Body.stkCallback.CallbackMetadata) {
//       console.log(callbackData.Body);
//       return res.json("OK");
//     }
  
//     console.log(callbackData.Body.stkCallback.CallbackMetadata);
  
//     const phone =callbackData.Body.stkCallback.CallbackMetadata.Item[4].Value;
//     const amount = callbackData.Body.stkCallback.CallbackMetadata.Item[0].Value;
//     const transaction_id = callbackData.Body.stkCallback.CallbackMetadata.Item[1].Value;
  
//     console.log({phone, amount,transaction_id});
//     const payment = new Payment();
//     payment.number = phone;
//     payment.amount = amount;
//     payment.transaction_id = transaction_id;
  
//     payment.save().then((data)=>{
//       console.log({message: "Saved succesful",data})
//     }).catch((err) => {
//       console.log(err)
//     })
//   });
  

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