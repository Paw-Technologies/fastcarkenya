const mongoose = require('mongoose');

const newAccount = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    transactionIds: {
        type: []
    },
    balance: {
        type: Number, 
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('Account', newAccount);
