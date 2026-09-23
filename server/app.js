const express = require('express');
const dotenv = require('dotenv')
dotenv.config('.env');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const { CategoryRouter } = require('./routers/CategoryRouter');
const { ColorRouter } = require('./routers/ColorRouter');
const { BrandRouter } = require('./routers/BrandRouter');
const { ProductRouter } = require('./routers/ProductRouter');
const   AdminRouter  = require('./routers/AdminRouter');
const  UserRouter = require('./routers/UserRouter');



const cookieParser = require('cookie-parser');
const OrderRouter = require('./routers/OrderRouter');

const app = express();
app.use("/images",express.static(path.join(__dirname, 'public/images')));
app.use(cors({ origin: "http://localhost:3000", credentials: true}));
app.use(cookieParser());



app.use(express.json());
app.use("/api/category",CategoryRouter);
app.use("/api/color",ColorRouter);
app.use("/api/brand", BrandRouter)
app.use("/api/product", ProductRouter)
app.use("/api/admin", AdminRouter)
app.use("/api/user", UserRouter )
app.use("/api/order", OrderRouter)

mongoose.connect(process.env.MONGODB_URI,{
    dbName: process.env.DB_NAME,
})
.then(() =>
{ 
    console.log('DB connected');
app.listen(
    5000,
    () => {
        console.log('server started');
    }
)})
.catch((err) => {
    console.log("unable to connect db");
})
