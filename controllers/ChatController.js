const Chat = require("../models/Chat");


const addMessage = async(req, socket) => {
    let isChat = await Chat.findOne({$and :[{seller: req.seller, buyer: req.buyer}]})
    if(isChat !== null){
        isChat.updateOne({$push:{messages: req.message}}, (err, doc)=>{
            if(err)return console.log("is ", err)
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
        console.log("is res: ", res)
        return true;
    }, err=>{
        return false
    })
    .catch(err=>{
        return false;
    })
}

module.exports = { addMessage }
