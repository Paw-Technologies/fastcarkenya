const mongoose = require('mongoose')


const newEvent = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    postedBy: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    date: {
        type: String
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('Events', newEvent)
