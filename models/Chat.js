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
    sellerId: {
        type: String,
        required: doc =>{
            return doc.seller.userId
        }
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

