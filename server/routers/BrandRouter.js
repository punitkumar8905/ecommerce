const express = require('express');
const {getdata,create,deleteBrand,toggleBrand, updateBrand} = require('../controllers/BrandController');
const fileUpload = require("express-fileupload")
const BrandRouter = express.Router();


BrandRouter.get(
    "/", getdata
)

BrandRouter.post(
    "/create",
      fileUpload({
        createParentPath: true, 
    }),
     create
)

BrandRouter.delete(
    "/delete/:id", deleteBrand
)

BrandRouter.patch(
    "/toggle/:id/:flag", toggleBrand
)

BrandRouter.put(
    "/edit/:id",
    fileUpload({ createParentPath: true}),
     updateBrand
)

module.exports ={ BrandRouter };
