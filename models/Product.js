const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    numberOfUnits: {
        type: Number,
        required: true
    },
    coastPrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }, updated_at: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('product', ProductSchema);