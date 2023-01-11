const axios =require('axios')
const Payment = require('../models/paymentModel');


//  Middleware function to generate token
exports.generateToken = async(req, res, next) => {
 
    const consumer=process.env.MPESA_CONSUMER_KEY
    const secret = process.env.MPESA_SECRET_KEY
    const auth = new Buffer.from(`${consumer}:${secret}`).toString('base64');
    
    await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: {
        authorization : `Basic ${auth}`
      }
    }).then((response) => {
      req.token = response.data.access_token;
          
      next()
    }).catch((err) => {
      console.log(err);
      // res.status(400).json(err.message);
    })
  }
  
  
 exports.stkpush = async(req, res) => {
    const phone = req.body.phone.substring(1);
    const amount = req.body.amount;
    let token = req.token;
    let auth = `Bearer ${token}`;
    
    const date = new Date();
    const timestamp = date.getFullYear() +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      ('0' + date.getDate()).slice(-2) +
      ('0' + date.getHours()).slice(-2) +
      ('0' + date.getMinutes()).slice(-2) +
      ('0' + date.getSeconds()).slice(-2);
  
    const shortcode = process.env.MPESA_PAYBILL;
    const passkey = process.env.MPESA_PASSKEY;
    const password = new Buffer.from(shortcode + passkey + timestamp).toString('base64');
    // "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",
  
    await axios.post(
    
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",//CustomerBuyGoodsOnline
        "Amount": amount,
        "PartyA": `254${phone}`,
        "PartyB": shortcode,
        "PhoneNumber": `254${phone}`,
        "CallBackURL": "https://0fbd-105-163-157-215.in.ngrok.io/api/v1/payments/callback",
        "AccountReference": `254${phone}`,
        "TransactionDesc": "Test"
      },
      {
        headers: {
          Authorization : auth,
        },
      }
    ).then((data) => {
      console.log(data.data)
      res.status(200).json(data.data)
    }).catch((err) => {
      console.log(err);
      // res.status(400).json(err.message)
    })
    
  
  
  
  };
  
  
  exports.callback= (req, res) => {
    const callbackData = req.body;
    console.log(callbackData.Body);
    if (!callbackData.Body.stkCallback.CallbackMetadata) {
      console.log(callbackData.Body);
      return res.json("OK");
    }
  
    console.log(callbackData.Body.stkCallback.CallbackMetadata);
  
    const phone =callbackData.Body.stkCallback.CallbackMetadata.Item[4].Value;
    const amount = callbackData.Body.stkCallback.CallbackMetadata.Item[0].Value;
    const transaction_id = callbackData.Body.stkCallback.CallbackMetadata.Item[1].Value;
  
    console.log({phone, amount,transaction_id});
    const payment = new Payment();
    payment.number = phone;
    payment.amount = amount;
    payment.transaction_id = transaction_id;
  
    payment.save().then((data)=>{
      console.log({message: "Saved succesful",data})
    }).catch((err) => {
      console.log(err)
    })
  }