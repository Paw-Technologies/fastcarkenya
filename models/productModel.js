const mongoose = require('mongoose');
const User = require('../models/userModel');
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [false, 'A product must have a title'],
    },
    price: {
        type: Number,
        required: [false, 'A product must have a price']
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
    country: {
        type: String,
    },
    description: {
        type: String,
        trim: true,
        required: [false, 'A product must have a description']

    },
    imageCover: {
        type: String,
        required: [false, 'A product must have a cover image']
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
    location: [String],
    name: [String],
    contacts:[String],
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});


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