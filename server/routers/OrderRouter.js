const express = require("express");
const OrderRouter = express.Router();
const { placeOrder, verifyPayment, paymentFailed } = require("../controllers/OrderController");

OrderRouter.post("/place-order",placeOrder);
OrderRouter.post("/verify-payment", verifyPayment);
OrderRouter.post("/payment-failed", paymentFailed);


module.exports = OrderRouter;
