const CartModel = require('../models/CartModel');
const {ProductModel} = require('../models/ProductModel');

const syncCart = async (req, res) => {
    try {
        const { user_id, local_cart = [] } = req.body || {};

        for (const lc of local_cart) {
            const { id, quantity = 1 } = lc || {};
            if (!id) continue;

            const cartItem = await CartModel.findOne({ user_id, product_id: id });
            if (cartItem) {
                cartItem.quantity = cartItem.quantity + Number(quantity || 1);
                await cartItem.save();
            } else {
                await new CartModel({
                    user_id,
                    product_id: id,
                    quantity: Number(quantity || 1),
                }).save();
            }
        }

        const finalUserCart = await CartModel.find({ user_id }).populate({
            path: "product_id",
            select: "name price original_price discounted_price image_name image_path",
        });

        return res.send({
            finalUserCart,
            flag: 1,
        });
    } catch (error) {
        // console.log("Sync Cart Error:", error); 
        //    console.log("Message:", error.message);
        //  console.log("Stack:", error.stack);
        return res.status(500).json({
            success: false,
            message: 'Failed to sync cart',
            error: error.message,
        });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body || {};

        return res.status(200).json({
            success: true,
            message: 'Item added to cart',
            data: {
                productId,
                quantity,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to add item to cart',
            error: error.message,
        });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params || req.body || {};

        return res.status(200).json({
            success: true,
            message: 'Item removed from cart',
            data: {
                productId,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to remove item from cart',
            error: error.message,
        });
    }
};

module.exports = {
    syncCart,
    addToCart,
    removeFromCart,
};
