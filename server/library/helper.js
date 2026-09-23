const jwt = require("jsonwebtoken")

const generateRandomNames = (file_name) => {
    return new Date().getTime() + Math.floor(Math.random() * 10000) + file_name;
};


const  getToken = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY, {
        expiresIn: "7d" , 
    })
}

module.exports = {generateRandomNames, getToken} 