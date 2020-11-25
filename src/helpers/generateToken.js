// import jwt from "jsonwebtoken";
const jwt = require('jsonwebtoken')
const dotenv =require('dotenv')
dotenv.config()

const generateToken = (payload) =>{
     const token =  jwt.sign(payload, process.env.AUTH_KEY, {expiresIn: '365days'});
    // console.log(token)
}
// generateToken({email: "ade@fresh.co", id: "y278900824r82094", role: "caterer"})