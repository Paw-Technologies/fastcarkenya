const mongoose = require('mongoose');
const User = require('../models/userModel');
const productSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: [false, 'A product must have a title'],
    },
    name: {
        type: String
    },
    price: {
        type: Number,
        required: [false, 'A product must have a price']
    },
    category: {
        type: String
    },
    model: {
        type: String,
        required: [false, 'A product must have a model']
    },
    partNumber: {
        type: String,
        
    },
    year: {
        type: Number,
    },
    type: {
        type: String
    },
    country: {
        type: String,
    },
    description: {
        type: String,
        trim: true,
        required: [false, 'A product must have a description']

    },
    images: [String],
    isUsed: {
        type: Boolean,
        default: false

    },
    yearOfManufacture: {
        type: Number
    },
    mileage: {
        type: String
    },
    engineSize: {
        type: String,
    },
    size: {
        type: String,
    },
    ET: {
        type: String,
    },
    cb:  {
        type: String,
    },
    pcd:  {
        type: String,
    },
    transmission: {
        type: String
    },
    powerOutput: {
        type: String
    },
    currentTurbo: {
        type: String
    },
    driveTrain: {
        type: String
    },
    rating: {
        type: []
    },
    location: String, // phase out
    city: String,
    country: String,
    name: String,
    contacts:{
        type: String
    },
    seller: { // will check if needed
        type: Object,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

productSchema.index({name: 'text', brandName: 'text', 
    category: 'text',
    model: 'text',
    partNumber: 'text',
    year: 'text',
    country: 'text',
    description: 'text',
    mileage: 'text',
    yearOfManufacture: 'text',
    engineSize: 'text',
    size: 'text',
    ET: 'text',
    cb: 'text',
    pcd: 'text',
    location: 'text',
    transmission: "text",
})

// Query middleware
productSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'createdBy',
        select: 'name photo'
    })

    next()
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;