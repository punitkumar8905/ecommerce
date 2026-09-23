const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
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
    is_top: {
        type: Boolean,
        default: false,
    }
 },
{
    timestamps: true,
}
);


const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = { CategoryModel };