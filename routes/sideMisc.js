
const sideMiscServer = require('express').Router();
const multer = require('multer');
const { resolve } = require('path');
const cloudinary = require('cloudinary').v2;
const stream = require('stream');
const upload = require("../multer/Multer");
const dotenv = require('dotenv').config();
const fs = require('fs');
const Product = require('../models/productModel');


sideMiscServer.get('/myproducts', async(req, res)=>{
    console.log(req.headers)
    let userProducts = await Product.find({seller: req.headers.userId})

    console.log(userProducts)
    if(userProducts.length < 1) return res.status(404).json({
        message: "You Haven't added any products",
    })

    res.status(200).json({
        message: 'Success',
        products: userProducts
    })
})

module.exports = sideMiscServer


