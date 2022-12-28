const mongoose = require('mongoose')

const chats = new mongoose.Schema({
    buyer: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    messages: {
        type: [{}]
        // {
        //     message,
        //     timestamps,
        //     senderId,
        // }
    }
})



module.exports = mongoose.model('chats', chats);

