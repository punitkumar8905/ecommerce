const express = require('express');
const {getdata,create,deletedata,toggledata, updatedata,addOtherImages,deleteOtherImg} = require('../controllers/ProductController');
const fileUpload = require("express-fileupload")
const ProductRouter = express.Router();


ProductRouter.get(
    "/", getdata
)

ProductRouter.post(
    "/create",
      fileUpload({
        createParentPath: true, 
    }),
     create
)

ProductRouter.post("/add-other-images/:product_id",
      fileUpload({
        createParentPath: true, 
    }),addOtherImages)


ProductRouter.delete("/delete-other-image/:product_id/:idx", deleteOtherImg);
ProductRouter.delete(
    "/delete/:id", deletedata
)

ProductRouter.patch(
    "/toggle/:id/:flag", toggledata
)

ProductRouter.put(
    "/edit/:id",
    fileUpload({ createParentPath: true}),
     updatedata
)

module.exports ={ ProductRouter };
