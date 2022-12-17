const mongoose = require('mongoose');
const User = require('../models/userModel');
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A product must have a title'],
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price']
    },
    serialNumber: {
        type: Number,
    },
    model: {
        type: String,
        required: [true, 'A product must have a model']
    },
    partNumber: {
        type: Number,
        
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
        required: [true, 'A product must have a description']

    },
    imageCover: {
        type: String,
        required: [true, 'A product must have a cover image']
    },
    images: [String],
    isUsed: {
        type: Boolean,
        default: false

    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// virtual populate
// productSchema.


const Product = mongoose.model('Product', productSchema);

module.exports = Product;