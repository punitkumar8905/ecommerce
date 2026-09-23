const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");


const UserSchema = new mongoose.Schema(
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

    // primary_contact: {
    //   type: String,
    // },

    addresses:[{
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
        is_default:{
            type: Boolean,
            default: false,
        },
        contact: String,
    }],
    password: {
      type: String,
      required: true,
    },

    profile_photo: {
      type: String,
      default: "",
    },


    status: {
      type: Number,
      enum:[1,2,3],
      default: 1,
    },

    last_login: {
      type: Date,
      default: null,
    },

    last_password_changed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
