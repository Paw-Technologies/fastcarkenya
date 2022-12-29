
const miscServer = require('express').Router();
const multer = require('multer');
const { resolve } = require('path');
const cloudinary = require('cloudinary').v2;
const stream = require('stream');
const upload = require("../multer/Multer");
const dotenv = require('dotenv').config();
const fs = require('fs');
const Product = require('../models/productModel');
const Chat = require('../models/Chat');
const { default: mongoose } = require('mongoose');
const User = require('../models/userModel');
const Event = require('../models/Event');


const cloudinaryImageUploadMethod = async file => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream( {
            resource_type: 'image',
            public_id: `${Date.now() + file.originalname}`
        }, (err, res)=>{
            if(err){
                console.log("kuna shida mahali")
                reject(err)
            }
            console.log("a url here ", res.url)
            resolve(res.url)
        } ).end(file.buffer)
    })
  }



miscServer.post('/addevent', upload.single('image'), async(req, res)=>{
    const file = req.file
    let { location, date, description, title } = req.body
    let imageUrl = await cloudinaryImageUploadMethod(file)
    
    console.log(req.headers)
    let newEvent = new Event({
        image: imageUrl,
        title: title,
        postedBy: req.headers.userid,
        location: location,
        date: date,
        description: description
    })
    await newEvent.save()
    .then(resp=>{
        res.status(200).json({
            message: 'Event Added'
        })
    }, err=>{
        
        res.status(500).json({
            message: err.message
        })
    })
    .catch(err=>{
        res.json({
            message: "Error Occured"
        })
    })
})

miscServer.get('/getevents', async(req, res)=>{
    let events = await Event.find();
    res.status(200).json({
        events: events
    })
})

miscServer.get('/getmyevents', async(req, res)=>{
    let events = await Event.find({postedBy: req.headers.userid})
    res.status(200).json({
        events: events
    })
})
  
miscServer.post("/postproduct", upload.array("images"), async (req, res) => {
    // save image
    const files = req.files;

    const urls = [];
    for (const file of files) {
        const newPath = await cloudinaryImageUploadMethod(file);
        urls.push(newPath);
    }
    
    // save the product
    let { 
        brandName, 
        price,
        model,
        name,
        partNumber,
        year, 
        country,
        description,
        isUsed,
        mileage,
        engineSize,
        size,
        ET,
        cb,
        pcd,
        location,
        contacts,
        category,
        seller
     } = req.body
    let product = new Product({
        seller: seller,
        brandName: brandName,
        name: name,
        price: price,
        model: model,
        partNumber: partNumber,
        year: year,
        country: country,
        category: category,
        description: description,
        isUsed: isUsed,
        mileage: mileage,
        engineSize: engineSize,
        size: size,
        ET: ET,
        cb: cb,
        pcd: pcd,
        location: location,
        contacts: contacts,
        images: urls,
    })
    
    await product.save()
    .then(resp=>{
        res.status(200).json({
            status: "Success",
            message: `${req.body.model || req.body.name} Has been added`,
            productId: resp._id,
            data: resp
        })
    }, err=>{
        console.log(err)
        res.status(400).json({
            data: {
                message: "Error in adding Product, try again later"
            }
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json({
            data: {
                message: "Error in adding product, try again later"
            }
        })
    })
   }
  )


miscServer.get('/myproducts', async(req, res)=>{
    let userProducts = await Product.find({seller: req.headers.userid})

    if(userProducts.length < 1) return res.status(404).json({
        message: "You Haven't added any products",
    })

    res.status(200).json({
        message: 'Success',
        products: userProducts
    })
})

miscServer.post('/editproduct', async(req, res)=>{
    let update = {}
    update[ req.body.field ] = req.body.value

    console.log(req.header.prodId)
    
    Product.findByIdAndUpdate(req.body.prodId, {$set: update}, (err, doc)=>{
        if(err){
            res.status(304).json({
                message: "Could Not Modify"
            })
            return 
        }
        res.status(200).json({
            message: `${req.body.field} has been changed`
        })
    })
    // .then(resp=>{
    //     console.log("resp", resp)
    // }, err=>{
    //     console.log(err)
    // })
    // .catch(err=>{
    //     console.log(err)
    // })
})

miscServer.delete('/deleteproduct', async(req, res)=>{
    await Product.findByIdAndDelete(req.headers.prodid)
    .then(resp=>{
        res.status(200).json({
            message: `${resp.name || resp.brandName} deleted`
        })
    }, err=>{
        res.status(500).json({
            message: "Could not delete product, try later"
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: "Fatal Error, could not delete product, try again later"
        })
    })
})

miscServer.get('/getuser', async(req, res)=>{
    let user = await User.findById(req.headers.userid)
    if(user){
        res.status(200).json({
            user: user
        })
    }
    console.log(user)
})


miscServer.post('/find', async(req, res)=>{
    Product.find({$text: {$search: req.body.term}}, (err, prod)=>{
        if(err){
            console.log(err)
            return
        }
        res.status(200).json({
            list: prod
        })
    })
})


miscServer.get('/getchats', async(req, res)=>{
    // return await Chat.deleteMany({})
    let chats = await Chat.find({$or: [{seller: req.headers.userid}, {buyer: req.headers.userid}]})
    
    res.status(200).json({
        chats: chats
    })
})

miscServer.post('/sendmessage', async(req, res)=>{
    
    try {
        let thischat = await Chat.find({_id: req.body.chatId})
        
        if(thischat.length < 1){
            console.log("is there")
            let newChat = new Chat({
                buyer: req.body.buyer,
                seller: req.body.seller,
                messages: [JSON.parse(req.body.message)]
            })
    
            await newChat.save()
            .then(resp=>{
                res.status(200).json({
                    chatId: resp._id
                })
            })
            .catch(err=>{
                console.log("xmx", err)
            })
            return
        }

        // update
        await Chat.updateOne({_id: req.body.chatId}, {$push: {messages: JSON.parse(req.body.message)}})
        .then(resp=>{
            res.status(200).json({
                message: "Message saved",
            })
        }, err=>{
            res.status(500).json({
                message: "Could not save the message, try later"
            })
        })
        .catch(err=>{
            res.status(500).json({
                message: "Error occurred"
            })
        })

    } catch (error) {
        console.log("consoleed: ",error)
    }
    
})

module.exports = miscServer;
