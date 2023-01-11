const express = require('express');
const paymentController = require('./../controllers/paymentController')


const router = express.Router();

router.post('/mpesa', paymentController.generateToken, paymentController.stkpush);
router.post('/callback', paymentController.callback);

module.exports = router;