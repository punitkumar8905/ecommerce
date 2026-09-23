const { ColorModel } = require('../models/ColorModel')
const { messages } = require('../library/messages');
const { generateRandomNames } = require('../library/helper');
const path = require('path');


const getdata = async (req, res) => {
    try {
    
        const colors = await ColorModel.find().sort({ createdAt: -1 });
        res.send({
            
            flag: 1,
            colors,
           
        });
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const create = async (req, res) => {
    try {
        const {name, code} = req.body;
      

        const colorExists = await ColorModel.findOne({
            $or: [{ name },{ code }
            ]
        });
        if (colorExists) {
            return res.send(messages.general_error("color name or code already exists"));
        }
        
        const color = new ColorModel({
            name,
            code,
        });
        await color.save();

         res.send(messages.created_msg("color"));
    } catch (error) {
        res.send(messages.catch_error);
    }
};


const deleteColor = async (req, res) => {
    try {
        const id = req.params.id;
        const color  = await ColorModel.findById(id);
        if(!color){
            return res.send(messages.general_error("color not found"));
        }
        await ColorModel.findByIdAndDelete(id);
        res.send(messages.delete_msg("color"));
    } catch (error) {
        res.send(messages.catch_error);
    }
};


const toggleColor = async (req, res) => {
    try {
        const { id } = req.params;
        // 1: status, 2: on_home, 3: is_featured, 4: is_top
        const color = await ColorModel.findById(id);
        if (!color) {
          return res.send(messages.general_error("color not found"))
        }  

        await ColorModel.findByIdAndUpdate(
            {_id: id},
            {$set:{status:!color.status}}
        )
        //   color.status = !color.status;
        //   await color.save();
           res.send(messages.general_success("color status updated"));
        
    } catch (error) {
        res.send(messages.catch_error);
    }
};



const updateColor = async (req, res) => {
    try {
      const {id} = req.params;
      const {name, code } = req.body;
      const color = await ColorModel.findById(id);
      if(!color) {
        return res.send (messages.general_error('color not found'));
      }
      
      
      color.name = name;
      color.code = code;
      await color.save();
      return res.send(messages.general_success("color updated"));
    } catch (error) {
        res.send(messages.catch_error);
    }
}


module.exports = { getdata, create, deleteColor, toggleColor, updateColor };
