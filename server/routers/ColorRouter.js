const express = require('express');
const {getdata,create,deleteColor,toggleColor, updateColor} = require('../controllers/ColorController');
const ColorRouter = express.Router();


ColorRouter.get(
    "/", getdata
)

ColorRouter.post(
    "/create",
     create
)

ColorRouter.delete(
    "/delete/:id",
     deleteColor
)

ColorRouter.patch(
    "/toggle/:id/:flag",
     toggleColor
)

ColorRouter.put(
    "/edit/:id",
     updateColor
)

module.exports ={ ColorRouter };
