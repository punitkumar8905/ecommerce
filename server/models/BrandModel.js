const mongoose  = require('mongoose')

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
     slug: {
        type: String,
        unique: true,
    },
     image_name: {
        type: String,
        unique: true,
    },
    status:{
        type: Boolean,
        default: true,
    },
     is_best:{
        type: Boolean,
        default: true,
    },
    category_ids: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Category"
        }
    ]
});

const BrandModel = mongoose.model("Brand", BrandSchema);
module.exports = { BrandModel }