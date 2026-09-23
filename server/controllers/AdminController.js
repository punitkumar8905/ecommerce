    const AdminModel = require('../models/AdminModel');
    const {messages} = require('../library/messages');
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    const register =  async(req, res) => {
    try {
        const {name, email, password, role} = req.body;
        const adminExists = await AdminModel.findOne({email});
        if(adminExists) {
            return res.send(messages.general_error('Admin with this email already exists'))
        }
        const enc_password = cryptr.encrypt(password);
        await new AdminModel({
            name,
            email,
            password: enc_password,
            role: role,
        }).save();
        res.send(messages.general_success('Admin registerd successfully'));
    } catch (error) {
        res.send(messages.catch_error);
    } 
    };



    const login = async(req, res) => {
        try {
            const {password, email} = req.body;
            const admin = await AdminModel.findOne({email})
            if(admin){
                const decodePassword = cryptr.decrypt(admin.password);
                if(decodePassword == password){
                    res.send({
                        admin: {...admin.toJSON(), password: " "},
                        flag: 1,
                        msg: "Admin login successfully",
                    }
                    )
                }else{
                    res.send(messages.general_error("password is incorrect"));
                }
            }else{
                res.send(messages.general_error("Email does not exists"))
            }
        } catch (error) {
                res.send(messages.catch_error);
        }
    }





    module.exports = {
        register,
        login,
    };