const User = require('../models/userModel');

const sideMiscServer = require('express').Router();


sideMiscServer.get('/getseller', async(req, res)=>{
    let seller = await User.findById(req.header.userid);
    
    if (seller) res.status(200).json({
        seller: seller
    }) 
    else {
        res.status(404).json({
            message: "Couldn't get phone"
        })
    }
    
})

sideMiscServer.get('/getreviews', async(req, res)=>{
    
})

module.exports = sideMiscServer


