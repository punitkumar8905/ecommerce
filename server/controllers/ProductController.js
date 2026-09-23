const { ProductModel } = require('../models/ProductModel')
const { categoryModel } = require('../models/CategoryModel');
const { brandModel } = require('../models/BrandModel');
const { colorModel } = require('../models/ColorModel');
const { messages } = require('../library/messages');
const { generateRandomNames } = require('../library/helper');
const fs = require('fs');
const path = require('path');
const { count } = require('console');


const addOtherImages = async (req,res) => {
    try {
        const otherImages = req.files.other_images;
        const {product_id} = req.params;
        const product = await ProductModel.findById(product_id)
        if(!product);
        const current_other_images = [...product.other_images]
        if(Array.isArray(otherImages)){
        for(let otherImg of otherImages) {
        const imageName = generateRandomNames(otherImg.name);
        const destination = "./public/images/product/other_images/" + imageName;
        await otherImg.mv(destination); 
            current_other_images.push(imageName);
        }
        }else {
        const imageName = generateRandomNames(otherImages.name);
        const destination = "./public/images/product/other_images/" + imageName;
        await otherImages.mv(destination); 
            current_other_images.push(imageName)
        }
        product.other_images = current_other_images;
        await product.save();

        res.send({
            current_other_images,
            flag:1,
            msg:"images added",
        })
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const getdata = async (req, res) => {
    try {
        const url_query = req.query;
        const dynamic_filter = {};
        if(url_query.id){
            dynamic_filter['_id'] = url_query.id;
        }
            if(url_query.product_slug){
            dynamic_filter['slug'] = url_query.product_slug;
        }
            if(url_query.color_id){
                const color_IDS = url_query.color_id.split("_");  
                const colors = await colorModel.find({_id: {$in: color_IDS}}).select("_id");
                const colorIDS = colors.map((color) => color._id);
                dynamic_filter.color_ids= {$in: colorIDS};                                                                                                                                                                                                                                                                                                                                                           
            }

            if(url_query.brand_id){
                const brandSlugs = url_query.brand_id.split("_");                                                                                                                                                                                                                                                                                                                                                               
                const brands = await brandModel.find({slug: {$in: brandSlugs}}).select("_id");
                const brandIDS = brands.map((brand) => brand._id);
                dynamic_filter.brand_id = {$in: brandIDS};
            } 



            if(url_query.category_slug){
                const category = await categoryModel.findOne({slug: url_query.category_slug});
                if(category){
                    dynamic_filter['category_id'] = category._id;
                }else{
                    return res.send(messages.general_error("category not found"));
                }
            }
            if(url_query.status){
                dynamic_filter["status"] = url_query.status == "true" ? true:false;
            }
            if(url_query.on_home){
                dynamic_filter["on_home"] = url_query.on_home == "true" ? true:false;
            }
            if(url_query.is_featured){
                dynamic_filter["is_featured"] = url_query.is_featured == "true" ? true:false;
            }
            if(url_query.is_top){
                dynamic_filter["is_top"] = url_query.is_top == "true" ? true:false;
            }
            if(url_query.is_best){
                dynamic_filter["is_best"] = url_query.is_best == "true" ? true:false;
            }
            if(url_query.is_hot){
                dynamic_filter["is_hot"] = url_query.is_hot == "true" ? true:false;
            }

        const products = await ProductModel.find(dynamic_filter).sort({ createdAt: -1 })
        .populate([
            {
                path: "category_id",
                select: "name",
            },
            {
                path: "color_ids",
                select: "name"
            },
            {
                path: "brand_id",
                select: "name",
            },
        ])
        res.send({
            count: Array.isArray(products) && products.length,
            flag: 1,
            products,
            image_path:"/images/product/"
        });
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const create = async (req, res) => {
    try {
        const data = req.body;
        const image = req.files?.image;

        const productExists = await ProductModel.findOne({
            $or: [{ name: data.name }, { slug: data.slug }, {sku_id: data.sku_id} ],
        });
        if (productExists) {
            return res.send(messages.general_error("product name or slug already exists"));
        }
        // image upload code here
        if (!image) {
            return res.send(messages.general_error("Please upload a product image"));
        }      
        const imageName = generateRandomNames(image.name);
        const destination = "./public/images/product/main_images/" + imageName;
        await image.mv(destination); // move image from temp to desti


        // const dir = path.join(__dirname, "../public/images/category");

        // if (!fs.existsSync(dir)) {
        //     fs.mkdirSync(dir, { recursive: true });
        // }

        // const destination = path.join(dir, imageName);
        // await image.mv(destination);
    
      const product = new ProductModel({
       
        sku_id: data.sku_id,
         name: data.name,
         slug: data.slug,
         original_price: Number(data.original_price),
         discounted_price: Number(data.discounted_price),
         discount_percentage: Number(data.discount_percentage),
         category_id: data.category_id,
         brand_id: data.brand_id, 
         color_ids: data.color_ids ?  JSON.parse(data.color_ids) : [],
         description: data.description,
         image_name: imageName,
        // : [],
         
      });
        await product.save();

         res.send(messages.created_msg("product"));
    } catch (error) {
               res.send(messages.catch_error);
    }
};


const deletedata = async (req, res) => {
    try {
        const id = req.params.id;
        const product  = await ProductModel.findById(id);
        if(!product){
            return res.send(messages.general_error("product not found"));
        }
        await fs.unlinkSync(`./public/images/product/main_images/${product.image_name}`)
        await ProductModel.findByIdAndDelete(id);
        res.send(messages.delete_msg("product"));
    } catch (error) {
        res.send(messages.catch_error);
    }
};


const toggledata = async (req, res) => {
    try {
        const { id, flag } = req.params;
        // 1: status, 2: on_home, 3: is_featured, 4: is_top , 5: is_best 6: is_hot
        const product = await ProductModel.findById(id);
        if (product) {
            if (flag == 1) {
                product.status = !product.status;
            } else if (flag == 2) {
                product.on_home = !product.on_home;
            } else if (flag == 3) {
                product.is_featured = !product.is_featured;
            } else if (flag == 4) {
                product.is_top = !product.is_top;
            } else if (flag == 5) {
                product.is_best = !product.is_best;
            } else if (flag == 6) {
                product.is_hot = !product.is_hot;
            }
            await product.save();
            res.send(messages.general_success("Toggled successfully"));
        } else {
            res.send(messages.general_error("product not found"));
        }
    } catch (error) {
        res.send(messages.catch_error);
    }
};



const updatedata = async (req, res) => {
    try {
      const {id} = req.params;
      const image = req.files?.image;
      const {name, slug } = req.body;
      const product = await ProductModel.findById(id);
      if(!product) {
        return res.send (messages.general_error('product not found'));
      }
      
      if(image){
         const imageName = generateRandomNames(image.name);
        const destination = "./public/images/product/" + imageName;
        await image.mv(destination); // move image from temp to desti
        await fs.unlinkSync(`./public/images/product/${product.image_name}`)
        product.image_name = imageName
      }
      product.name = name;
      product.slug = slug;
      await product.save();
      return res.send(messages.general_success("product updated"));
    } catch (error) {
        console.log(error.message);
        res.send(messages.catch_error);
    }
}

const deleteOtherImg = async(req,res) => {
    try {
        const {product_id,idx} = req.params;
        const product = await ProductModel.findById(product_id);
        if(!product);
        const current_other_images = [...product.other_images];
        await fs.unlinkSync(
            "./public/images/product/other_images/" + current_other_images[idx]
        );
        current_other_images.splice(idx,1);
        product.other_images = current_other_images;
        await product.save(); 
        
        res.send({
            current_other_images,
            flag:1,
            msg: "Image deleted"
        })
    } catch (error) {
        
    }
}


module.exports = { getdata, create, deletedata, toggledata, updatedata, addOtherImages, deleteOtherImg };
