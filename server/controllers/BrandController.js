const { BrandModel } = require('../models/BrandModel')
const { messages } = require('../library/messages');
const { generateRandomNames } = require('../library/helper');
const fs = require('fs');
const path = require('path');
const { count } = require('console');
const ProductModel = require('../models/ProductModel');

const getdata = async (req, res) => {
    try {
        const url_query = req.query;
        const dynamic_filter = {};
        if(url_query.id){
            dynamic_filter['_id'] = url_query.id;
        }
            if(url_query.slug){
            dynamic_filter['slug'] = url_query.slug;
        }
         
             if(url_query.status){
            dynamic_filter['status'] = url_query.status == "true" ? true: false;
        }

          if(url_query.home){
            dynamic_filter['on_home'] = url_query.home == "true" ? true: false;
        }

          if(url_query.top){
            dynamic_filter['is_top'] = url_query.top == "true" ? true: false;
        }

          if(url_query.best){
            dynamic_filter['is_best'] = url_query.best == "true" ? true: false;
        }

        if(url_query.category_id) { 
            dynamic_filter["category_ids"] = {
                $in: [url_query.category_id]
            };
        }

        const brands = await BrandModel.find(dynamic_filter).sort({ createdAt: -1 })
        .populate({
            path:"category_ids",
            select:"name"
        });

        // const finalBrands = [];
        // for(let brand of brands) {
        //     const productCount = await ProductModel.find({brand_id : brand._id})
        //     .countDocuments();
        //     finalBrands.push({
        //         ...brand.toJSON(),
        //         productCount
        //     })
        // }

        res.send({
            count: Array.isArray(brands) && brands.length,
            flag: 1,
            brands,
            image_path:"/images/brand/"
        });
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const create = async (req, res) => {
    try {
        const data = req.body;
        const image = req.files?.image;

        const brandExists = await BrandModel.findOne({
            $or: [{ name: data.name },
            { slug: data.slug }
            ]
        });
        if (brandExists) {
            return res.send(messages.general_error("brand name or slug already exists"));
        }
        // image upload code here
        if (!image) {
            return res.send(messages.general_error("Please upload a brand image"));
        }      
        const imageName = generateRandomNames(image.name);
        const destination = "./public/images/brand/" + imageName;
        await image.mv(destination); // move image from temp to desti


        // const dir = path.join(__dirname, "../public/images/category");

        // if (!fs.existsSync(dir)) {
        //     fs.mkdirSync(dir, { recursive: true });
        // }

        // const destination = path.join(dir, imageName);
        // await image.mv(destination);
    
        const brand = new BrandModel({
            name: data.name,
            slug: data.slug,
            category_ids: JSON.parse(data.category_ids),
            image_name: imageName,
        })
        await brand.save();

         res.send(messages.created_msg("brand"));
    } catch (error) {
        res.send(messages.catch_error);
    }
};


const deleteBrand = async (req, res) => {
    try {
        const id = req.params.id;
        const brand  = await BrandModel.findById(id);
        if(!brand){
            return res.send(messages.general_error("brand not found"));
        }
        await fs.unlinkSync(`./public/images/brand/${brand.image_name}`)
        await BrandModel.findByIdAndDelete(id);
        res.send(messages.delete_msg("brand"));
    } catch (error) {
        res.send(messages.catch_error);
    }
};


const toggleBrand = async (req, res) => {
    try {
        const { id, flag } = req.params;
        // 1: status, 2: on_home, 3: is_featured, 4: is_top
        const brand = await BrandModel.findById(id);
        if (brand) {
            if (flag == 1) {
                brand.status = !brand.status;
            } 
            await brand.save();
            res.send(messages.general_success("Toggled successfully"));
        } else {
            res.send(messages.general_error("brand not found"));
        }
    } catch (error) {
        res.send(messages.catch_error);
    }
};



const updateBrand = async (req, res) => {
    try {
      const {id} = req.params;
      const image = req.files?.image;
      const {name, slug } = req.body;
      const brand = await BrandModel.findById(id);
      if(!brand) {
        return res.send (messages.general_error('brand not found'));
      }
      
      if(image){
         const imageName = generateRandomNames(image.name);
        const destination = "./public/images/brand/" + imageName;
        await image.mv(destination); // move image from temp to desti
        await fs.unlinkSync(`./public/images/band/${brand.image_name}`)
        brand.image_name = imageName
      }
      brand.name = name;
      brand.slug = slug;
      await brand.save();
      return res.send(messages.general_success("brand updated"));
    } catch (error) {
        console.log(error.message);
        res.send(messages.catch_error);
    }
}


module.exports = { getdata, create, deleteBrand, toggleBrand, updateBrand };
