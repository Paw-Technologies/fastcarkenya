const Chat = require("../models/Chat");


const addMessage = async(req, socket) => {
    // return await Chat.deleteMany()
    let isChat = await Chat.findOne({$and :[{sellerId: req.seller.userId, buyerId: req.buyer.userId}]})

    if(isChat !== null){
        isChat.updateOne({$push:{messages: req.message}}, (err, doc)=>{
            if(err)return false
        })
        return true
    }
    let newChat = new Chat({
        seller: req.seller,
        buyer: req.buyer,
        messages: [req.message]
    })
    await newChat.save()
    .then(res=>{
        console.log('saved...', res)
        return true;
    }, err=>{
        return false
    })
    .catch(err=>{
        return false;
    })
}

module.exports = { addMessage }
