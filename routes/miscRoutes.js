
const miscServer = require('express').Router();
const multer = require('multer');
const { resolve } = require('path');
const cloudinary = require('cloudinary').v2;
const stream = require('stream');
const upload = require("../multer/Multer");
const dotenv = require('dotenv').config();
const fs = require('fs');
const Product = require('../models/productModel');

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
        category
     } = req.body

    let product = new Product({
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
        contacts: contacts.split(','),
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
    })

   }
  )

module.exports = miscServer;
