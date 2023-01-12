const mongoose = require('mongoose');

const newUnpaid = new mongoose.Schema({
    seller: {
        type: String,
        required: true
    },
    product: {
        
    }
})

module.exports = mongoose.model('unpaidForAds', newUnpaid)
