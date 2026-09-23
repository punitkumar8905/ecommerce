const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      enum: [0 , 1],
      default: 1,  // 0 super admin,  1 admin
    },
    status:{
        type: Boolean,
        default: true,
    },
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Admin', adminSchema);


 