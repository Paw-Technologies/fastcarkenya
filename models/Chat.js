const mongoose = require('mongoose')

const chats = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    recepient: {
        type: String,
        required: true
    },
    messages: {
        type: [{}]
        // {
        //     message,
        //     timestamps,
        //     senderId,
        //     recepientId
        // }
    }
})



module.exports = mongoose.model('chats', chats);

