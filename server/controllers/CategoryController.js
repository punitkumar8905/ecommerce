const { CategoryModel } = require('../models/CategoryModel')
const { messages } = require('../library/messages');
const { generateRandomNames } = require('../library/helper');
const fs = require('fs');
const path = require('path');
const { count } = require('console');

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

        if(url_query.home){
            dynamic_filter.on_home = url_query.home == "true" ? true : false;
        }

         if(url_query.top){
            dynamic_filter.is_top = url_query.top == "true" ? true : false;
        }

        if(url_query.featured){
            dynamic_filter.is_featured = url_query.featured == "true" ? true : false;
        }

        if(url_query.status){
            dynamic_filter.status = url_query.status == "true" ? true : false;
        }


        const categories = await CategoryModel.find(dynamic_filter).limit(
           url_query.limit != null ? url_query.limit : 0).sort({ createdAt: -1 });
        res.send({
            count: Array.isArray(categories) && categories.length,
            flag: 1,
            categories,
            image_path:"/images/category/"
        });
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const create = async (req, res) => {
    try {
        const data = req.body;
        const image = req.files?.image;

        const categoryExists = await CategoryModel.findOne({
            $or: [{ name: data.name },
            { slug: data.slug }
            ]
        });
        if (categoryExists) {
            return res.send(messages.general_error("category name or slug already exists"));
        }
        // image upload code here
        if (!image) {
            return res.send(messages.general_error("Please upload a category image"));
        }      
        const imageName = generateRandomNames(image.name);
        const destination = "./public/images/category/" + imageName;
        await image.mv(destination); // move image from temp to desti


        // const dir = path.join(__dirname, "../public/images/category");

        // if (!fs.existsSync(dir)) {
        //     fs.mkdirSync(dir, { recursive: true });
        // }

        // const destination = path.join(dir, imageName);
        // await image.mv(destination);
    
        const category = new CategoryModel({
            name: data.name,
            slug: data.slug,
            image_name: imageName,
        })
        await category.save();

         res.send(messages.created_msg("category"));
    } catch (error) {
        res.send(messages.catch_error);
    }
};


const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category  = await CategoryModel.findById(id);
        if(!category){
            return res.send(messages.general_error("category not found"));
        }
        await fs.unlinkSync(`./public/images/category/${category.image_name}`)
        await CategoryModel.findByIdAndDelete(id);
        res.send(messages.delete_msg("category"));
    } catch (error) {
        res.send(messages.catch_error);
    }
};


const toggleCategory = async (req, res) => {
    try {
        const { id, flag } = req.params;
        // 1: status, 2: on_home, 3: is_featured, 4: is_top
        const category = await CategoryModel.findById(id);
        if (category) {
            if (flag == 1) {
                category.status = !category.status;
            } else if (flag == 2) {
                category.on_home = !category.on_home;
            } else if (flag == 3) {
                category.is_featured = !category.is_featured;
            } else if (flag == 4) {
                category.is_top = !category.is_top;
            }
            await category.save();
            res.send(messages.general_success("Toggled successfully"));
        } else {
            res.send(messages.general_error("category not found"));
        }
    } catch (error) {
        res.send(messages.catch_error);
    }
};



const updateCategory = async (req, res) => {
    try {
      const {id} = req.params;
      const image = req.files?.image;
      const {name, slug } = req.body;
      const category = await CategoryModel.findById(id);
      if(!category) {
        return res.send (messages.general_error('category not found'));
      }
      
      if(image){
         const imageName = generateRandomNames(image.name);
        const destination = "./public/images/category/" + imageName;
        await image.mv(destination); // move image from temp to desti
        await fs.unlinkSync(`./public/images/category/${category.image_name}`)
        category.image_name = imageName
      }
      category.name = name;
      category.slug = slug;
      await category.save();
      return res.send(messages.general_success("category updated"));
    } catch (error) {
        console.log(error.message);
        res.send(messages.catch_error);
    }
}


module.exports = { getdata, create, deleteCategory, toggleCategory, updateCategory };
