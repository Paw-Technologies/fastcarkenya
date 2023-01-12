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
    expiresAt: {
        type: Date
    },
    description: {
        type: String
    }
})

newEvent.index({ "expiresAt": 1 }, {expireAfterSeconds: 3600})


module.exports = mongoose.model('Events', newEvent)
