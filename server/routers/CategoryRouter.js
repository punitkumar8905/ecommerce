const express = require('express');
const {getdata,create,deleteCategory,toggleCategory, updateCategory} = require('../controllers/CategoryController');
const fileUpload = require("express-fileupload")
const CategoryRouter = express.Router();


CategoryRouter.get(
    "/", getdata
)

CategoryRouter.post(
    "/create",
      fileUpload({
        createParentPath: true, 
    }),
     create
)

CategoryRouter.delete(
    "/delete/:id", deleteCategory
)

CategoryRouter.patch(
    "/toggle/:id/:flag", toggleCategory
)

CategoryRouter.put(
    "/edit/:id",
    fileUpload({ createParentPath: true}),
     updateCategory
)

module.exports ={ CategoryRouter };
