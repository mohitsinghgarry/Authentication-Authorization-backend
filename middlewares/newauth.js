// auth , isStudent , isAdmin
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.auth = (req , res , next)=>{
    try{
        console.log("cookies" ,req.cookies.newcookie);
        // console.log(req.header('auth').replace('Bearer ',''));
        const token =  req.cookies.newcookie || req.body.token;
        if(!token || token == undefined) {
            return res.status(401).json({
                success:false,
                message:'token not found'
            })
        }
        try{
            //verifying the token 
         const payload = jwt.verify(token , process.env.JWT_SECRET);
        //  console.log(payload);
         req.user = payload;

        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"invalid token"
            })
        }
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"something went wrong while varifying the token"
        })
    }
}

exports.isStudent = (req , res , next)=>{
    try{
        if(req.user.role !== 'Student'){
            return res.status(401).json({
                success:false,
                message:"this is protected route for students"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"=user roll cannot verify"
        })
    }
}

exports.isAdmin = (req , res , next)=>{
    try{
        if(req.user.role !== 'Admin'){
            return res.status(401).json({
                success:false,
                message:"this is protected route for admin"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"=user roll cannot verify"
        })
    }
}