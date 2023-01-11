const mongoose = require('mongoose')

const chats = new mongoose.Schema({
    buyer: {
        type: {},
        required: true
    },
    seller: {
        type: {},
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

