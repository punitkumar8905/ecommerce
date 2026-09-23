const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    sku_id: {
        type: String,
        required: true,
        unique: true,
    },    
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug:{
        type:String,
        required: true,
        unique: true,
        trim: true,
    },
    original_price: {
        type: Number,
        required: true,
    },
    discounted_price: {
        type: Number,
        required: true,
    },
    discount_percentage: {
        type: Number,
        default: 0,
    },
    category_id : {
        type: mongoose.Schema.ObjectId,
        ref:"Category"
    },
    description: {
        type: String,
        required: true,
    },
    other_images: [{
        type: String
    }],
    color_ids : [
        {
        type: mongoose.Schema.ObjectId,
        ref:"Color"
    }],
    brand_id : {
        type: mongoose.Schema.ObjectId,
        ref:"Brand"
    },
    image_name:{
        type: String,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    on_home: {
        type: Boolean,
        default: false,
    },
    is_featured: {
        type: Boolean,
        default: false,
    },
    is_hot: {
        type: Boolean,
        default: false,
    },
    is_best: {
        type: Boolean,
        default: false,
    },
    is_top: {
        type: Boolean,
        default: false,
    }
 },
{
    timestamps: true,
}
);


const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = { ProductModel };