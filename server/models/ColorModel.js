const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    code:{
        type:String,
        required: true,
        unique: true,
        trim: true,
    },
   
    status: {
        type: Boolean,
        default: true,
    },

 },
{
    timestamps: true,
}
);


const ColorModel = mongoose.model("Color", ColorSchema);
module.exports = { ColorModel };