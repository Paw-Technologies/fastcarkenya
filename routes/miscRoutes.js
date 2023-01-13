
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
const Reviews = require('../models/Reviews');


const cloudinaryImageUploadMethod = async file => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream( {
            resource_type: 'image',
            public_id: `${Date.now() + file.originalname}`
        }, (err, res)=>{
            if(err){
                reject(err)
            }
            resolve(res.url)
        } ).end(file.buffer)
    })
  }



miscServer.post('/addevent', upload.single('image'), async(req, res)=>{
    const file = req.file
    let { location, date, description, title } = req.body
    let imageUrl = await cloudinaryImageUploadMethod(file)
    
    let newEvent = new Event({
        image: imageUrl,
        title: title,
        postedBy: req.headers.userid,
        location: location,
        expiresAt: new Date(date),
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
  
miscServer.post('/editaccount', upload.single('image'), async(req, res, next)=>{
    let file = req.file;
    return console.log(req.files)
    let { name, phoneNumber, email, password, passwordConfirm } = req.body
        // let findUser = await User.findById(req.headers.userid)

    User.findOneAndUpdate({_id: req.headers.userid}, {$set: {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
    }}, (err, doc)=>{
            if(err){
                res.status(304).json({
                    message: err.message
                })
            }
            res.status(200).json({
                message: "Changes saved"
            })
        })
    }
)

const intaSend = require('intasend-node');
const { getCategoryPricing } = require('../utils/CategoryPricing');
const Invoices = require('../models/Invoices');

let intasend = new intaSend(process.env.INTAPUB, process.env.INTASEC, false)

let collection = intasend.collection()


const saveInvoice = async(client, invoiceId, cat) =>{
    let newInvoice = new Invoices({
        client: client.userId,
        invoiceId: invoiceId,
        category: cat
    })
    await newInvoice.save()
    .then(resp=>{
        return resp
    })
    .catch(err=>{

    })
}

// payment webhook 
miscServer.post("/paidinvoice", async(req, res)=>{
    console.log("is is is is \n", req.body)
    let { api_ref, value } = req.body
    
    let id = api_ref.slice(0, 24);
    let category = api_ref.slice(24, api_ref.length)
    let user = await User.findById(id)
    let query = {}
    query[category] = value
    console.log("user is ", user)
    user.updateOne({$set: query}, (err, doc)=>{
        if(err){
            return console.log('err', err)
        }
        console.log("updated", doc)
    })

})

miscServer.post("/postproduct", upload.array("images"), async (req, res) => {
    let userObj = JSON.parse(req.body.seller)
    // check account balance
    let user = await User.findById(JSON.parse(req.body.seller).userId)
    
    // user not found
    if(user === null) return res.status(404).json({
        message: "You do not have an account"
    })

    // user found check balance with product category
    // await getCategoryPricing(req.body.category, user)
    // .then(resp=>{
    //     if(!resp.p){
    //         collection
    //         .charge({
    //             first_name: `${userObj.name}`,
    //             last_name: `${userObj.name}`,
    //             email: userObj.email,
    //             host: "https://fastcar.onrender.com",
    //             amount: 10, //resp.v,
    //             currency: 'KES',
    //             phone_number: userObj.phoneNumber,
    //             api_ref: `${userObj.userId}${resp.c}`,
    //             userid: userObj.userId
    //         }).then(response=>{
    //             saveInvoice(userObj.userId, response.id, resp.c)
    //             .then(()=> {
    //                 res.status(200).json({
    //                     needPay: true,
    //                     url: response.url
    //                 })
    //             }
    //             )
    //         }).catch(err=>{
    //             console.log('this err', err.toString())
    //             return
    //         })
    //         return
    //     }else{
    //         proceed()
    //     }
    // })
    
    proceed()
    // return await Product.deleteMany()
    // save image
    // return console.log(JSON.parse(req.body.seller))
    async function proceed (){
        const files = req.files;

        const urls = [];
        for (const file of files) {
            const newPath = await cloudinaryImageUploadMethod(file);
            urls.push(newPath);
        }

        let empty = req.body
        empty['images'] = urls
        // empty['paidFor'] = paidFor
        empty['seller'] = JSON.parse(req.body.seller)
        let product = new Product(empty)

        await product.save()
        .then(resp=>{
            function addDays(date, days) {
                var result = new Date(date);
                result.setDate(result.getDate() + days);
                return result;
            }
            // return console.log(resp.createdOn)
            res.status(200).json({
                status: "Success",
                message: `${req.body.model || req.body.name || "Product"} Has been added, it will be inactive on ${addDays(resp.createdOn, 10)})}`,
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
    }   
  )


miscServer.get('/myproducts', async(req, res)=>{
    // {sellerId: req.headers.userid}
    let userProducts = await Product.find({sellerId: req.headers.userid})
    // console.log(userProducts)
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
    console.log("jdflkaj", req.headers.userid)
    try {
        let user = await User.findById(req.headers.userid)
        if(user){
            console.log(user)
            res.status(200).json({
                user: user
            })
        }
    } catch (error) {
        console.log(error)
    }
    
})


miscServer.post('/find', async(req, res)=>{
    Product.find({$text: {$search: req.body.term}}, (err, prod)=>{
        if(err){
            return
        }
        res.status(200).json({
            list: prod
        })
    })
})


miscServer.get('/getchats', async(req, res)=>{
    // return await Chat.deleteMany({})
    let chats = await Chat.find({$or: [{sellerId: req.headers.userid}, {buyerId: req.headers.userid}]})
    
    res.status(200).json({
        chats: chats
    })
})

miscServer.post('/sendmessage', async(req, res)=>{
    
    try {
        let thischat = await Chat.find({_id: req.body.chatId})
        
        if(thischat.length < 1){
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
    }
    
})


miscServer.post('/rate', async(req, res)=>{
    let riw = ['one', 'two', 'three', 'four', 'five']
    let rate = {}
    let { oneStar, twoStar, threeStar, fourStar, fiveStar } = req.body;
    let list = [oneStar, twoStar, threeStar, fourStar, fiveStar]
    
    let targ = list.filter(val=>typeof(val) !== 'undefined')
    rate[`${riw[list.indexOf(targ[0])]}Star`] = 1

    
    let review = await Reviews.find({product: req.body.product})
    if(review.length < 1){
        let newReview = new Reviews({
            product: req.body.product
        })
        await newReview.save()
        .then(()=>{
            rateQuery()
        }, err=>{
            res.status(304).json({
                message: "Please Try again later"
            })
        })
        .catch(err=>{
            res.status(304).json({
                message: "Couldn't save, try later"
            })
        })
        return
    }
    rateQuery()
    async function rateQuery(){
        await Reviews.findOneAndUpdate({product: req.body.product}, {$push: rate})
        .then(resp=>{
            console.log(resp)
            res.status(200).json({
                message: "Thank You for your response"
            })
        }, err=>{
            res.status(304).json({
                message: "Try again later"
            })
        })
        .catch(err=>{
            res.status(304).json({
                message: "Try again later"
            })
        })
    }
})

miscServer.get('/getrating', async(req, res)=>{
    let rating = await Reviews.find({product: req.headers.product})

    if(rating.length > 0){
        res.status(200).json({
            rating: getRating(rating[0])
        })
    }

    function getRating(doc){
        let scoreTot = (Number(doc.oneStar.length) * 1) + (Number(doc.twoStar.length) * 2) + 
            (Number(doc.threeStar.length) * 3) + (Number(doc.fourStar.length) * 4) + (Number(doc.fiveStar.length) * 5);
        let respTot = doc.oneStar.length + doc.twoStar.length + doc.threeStar.length + doc.fourStar.length + doc.fiveStar.length
        return (scoreTot/respTot).toFixed(1);
    } 
})

module.exports = miscServer;
