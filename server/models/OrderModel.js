//  user_id, products[{product_id, quantity, price_at_purchase, image_path,}], total_amount, payment_mode,(0->prepaid, 1->COD),
// delivery_address {}, order_status(0->pending, 1->confirmed, 2->shipped, 3->delivered, 4->cancelled), timestamps,
// razorpay_order_id,  razorpay_payment_id, 


const mongoose = require("mongoose");
const { schema } = require("./CartModel");

const orderSchema  = new mongoose.Schema(
    {
        user_id: {
         type: mongoose.Schema.Types.ObjectId, ref: "User", required:true 
        },
        products:[
            {
                product_id: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required:true},
                quantity:{ type: Number, required:true},
                price_at_purchase: {type: Number, required: true}, 
                image_path:{type: String,}
            },
        ],

                total_amount: { type: Number, required: true},
                payment_mode: {type: Number, enum:[0, 1], required:true},  
                // 0: prepaid, 1: cash on delivery

        delivery_address:{
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
    },
        order_status: {type: Number, enum:[0, 1, 2, 3, 4], default:0},
        // 0: pending, 1: confirmed, 2: shipped, 3: delivered, 4: cancelled
        razorpay_order_id: {type: String,}, 
        payment_status: { type: Number, enum: [0,1,2], default: 0},
        //  status  0:pending, 1:paid, 2:failed 
        razorpay_payment_id: {type: String,},
    },
    { timestamps: true }
);              
   

module.exports = mongoose.model("Order", orderSchema);
