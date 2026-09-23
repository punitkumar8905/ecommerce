const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrderModel");
const Razorpay = require("razorpay");
const crypto = require("crypto")

const razorpay_instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, order_id, razorpay_signature } = req.body;
        const order = await OrderModel.findById(order_id);
        if (!order) {
            return res.send({ flag: 0, message: "Order not found" });
        }
        // if (order.razorpay_order_id !== razorpay_order_id) {
        //     return res.status(400).send({ flag: 0, message: "Invalid Razorpay order" });
        // }
        //   ye wala code add kya 
        const crypto_type = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET,);
        crypto_type.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generated_signature = crypto_type.digest("hex");
        if (generated_signature == razorpay_signature) {
            order.payment_status = 1;
            order.razorpay_payment_id = razorpay_payment_id;
            order.order_status = 1;
            await order.save();
            await CartModel.deleteMany({ user_id: order.user_id });
            res.send({
                msg: "Order placed",
                flag: 1,
                order_id: order._id,
            })
        } else {
            res.send({
                flag: 0,
                msg: "Payment Verification Failed",
            })
        }
    } catch (error) {
        res.send({
            flag: 0,
            message: "Error Verifying Payment",
            error: error.message,

        })
    }
}

const paymentFailed = async (req, res) => {
    try {
        const { order_id } = req.body;
        const order = await OrderModel.findById(order_id);
        if (!order) {
            return res.status(404).send({ flag: 0, message: "Order not found" });
        }

        order.payment_status = 2;
        await order.save();
        return res.send({ flag: 1, message: "Payment marked as failed" });
    } catch (error) {
        return res.status(500).send({
            flag: 0,
            message: "Error updating payment status",
            error: error.message,
        });
    }
};

const placeOrder = async (req, res) => {
    try {
        const { product_details, delivery_address, total_amount, user_id, payment_mode } = req.body;

        const order = new OrderModel({
            user_id,
            products: product_details,
            delivery_address,
            total_amount,
            payment_mode,
        });
        if (payment_mode === 1) {

            await order.save();
            await CartModel.deleteMany({ user_id })
            res.send({ flag: 1, message: "Order placed successfully", order_id: order._id });
        } else {
            const options = {
                amount: total_amount * 100,
                currency: "INR",
                receipt: `order-rcptid_${order._id}`,
            }

            console.log("RAZORPAY KEY ID:", process.env.RAZORPAY_KEY_ID);
            console.log("RAZORPAY SECRET EXISTS:", !!process.env.RAZORPAY_KEY_SECRET);
            console.log("RAZORPAY OPTIONS:", options);


            razorpay_instance.orders.create(
                options,
                async (err, razorpay_order) => {
                    if (err) {
                        // res.send({flag:0, message: "Error creating Razorpay order"});


                        console.log("========== RAZORPAY ERROR ==========");
                        console.log("Error:", err);
                        console.log("Error Message:", err.message);
                        console.log("Error Description:", err.error?.description);
                        console.log("Error Code:", err.error?.code);
                        console.log("====================================");

                        return res.status(500).send({
                            flag: 0,
                            message: "Error creating Razorpay order",
                            error: err.message,
                        });

                    } else {
                        // order.razorpay_order_id = razorpay_order.id;
                        // await order.save(); 
                        // res.send({
                        //     flag: 1,
                        //     message: " Razorpay order created Successfully",
                        //     order_id: order._id,
                        //     razorpay_order_id : razorpay_order.id,
                        // })


                        console.log("RAZORPAY ORDER CREATED:", razorpay_order);

                        order.razorpay_order_id = razorpay_order.id;

                        await order.save();

                        return res.send({
                            flag: 1,
                            message: "Razorpay order created Successfully",
                            order_id: order._id,
                            razorpay_order_id: razorpay_order.id,
                        });
                    }
                }
            )
        }

    } catch (error) {
        res.send({ flag: 0, message: "Error placing order", error: error.message });
    }
};


module.exports = {
    placeOrder, verifyPayment, paymentFailed
}