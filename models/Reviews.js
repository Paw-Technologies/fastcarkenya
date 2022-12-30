const mongoose = require('mongoose');


const reviews = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    oneStar: {
        type: []
    },
    twoStar: {
        type: []
    },
    threeStar: {
        type: []
    },
    fourStar: {
        type: []
    }, 
    fiveStar: {
        type: []
    },
    comment: {
        type: String
    },
    rating: {
        type: Number
    }, 
})

module.exports = mongoose.model('Reviews', reviews)

