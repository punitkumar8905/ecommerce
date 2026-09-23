    const UserModel = require('../models/UserModel');
    const {messages} = require('../library/messages');
    const Cryptr = require('cryptr');
    const { getToken } = require('../library/helper');
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    const register =  async(req, res) => {
    try {
          
        const {name, email, password} = req.body;
        const userExists = await UserModel.findOne({email});
        if(userExists) {
            return res.send(messages.general_error('User with this email already exists'))
        }
        const enc_password = cryptr.encrypt(password);
        const user =  await new UserModel({
            name,
            email,
            password: enc_password,
            
        })
        await user.save();
        const token = getToken({...user.toJSON(), password: ""})
        // console.log("TOKEN:", token);

        res.cookie("token", token,{
            httpOnly: true, 
            maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
        })
        // res.cookie("user", JSON.stringify({...user.toJSON(), password: "", token}),{
        //     httpOnly: true,
        //     maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
        // })
        res.send({
            user: {...user.toJSON(), password: " "},
            flag: 1,
            msg: "user registerd successfully",
        })

    //  return   res.send(messages.general_success('User registerd successfully'));
    } catch (error) {
        // console.log(error.message)
        res.send(messages.catch_error);

    
    } 
    };



    const login = async(req, res) => {
        try {
            
            const {password, email} = req.body;
            const user = await UserModel.findOne({email})
            if(user){
                const decodePassword = cryptr.decrypt(user.password);
                if(decodePassword == password){
                    const token = getToken({...user.toJSON(), password: ""})
        res.cookie("token", token,{
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
        })
        // res.cookie("user", JSON.stringify({...user.toJSON(), password: "", token}),{
        //     httpOnly: true,
        //     maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
        // })

                    res.send({
                        user: {...user.toJSON(), password: " "},
                        flag: 1,
                        msg: "user login successfully",
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