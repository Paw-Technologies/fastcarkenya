const mongoose = require('mongoose');


const reviews = new mongoose.Schema({
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
    seller: {
        type: String,
        required: true
    }
})

