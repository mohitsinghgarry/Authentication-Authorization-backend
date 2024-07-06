const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.signup = async(req , res) =>{
    try{
        const{name , email , password , role} = req.body;
        // console.log(name);
         const existinguser = await User.findOne({email});
         console.log(existinguser);
         if(existinguser){
            return res.status(400).json({
                success:false,
                message:'user already exist',
            })
         }
         let hashpassword;
         try{
            hashpassword = await bcrypt.hash(password, 10);
         }
         catch(error){
            return res.status(500).json({
                success:false,
                message:"error in hashing password",
            })
         }
         //inserting user
         const user = User.create({
            name , email, password:hashpassword, role,
         })

         return res.status(200).json({
             success:true, 
             message: "user created successfully"
         })
         
    }
    catch(error){
            return res.status(500).json({
                success:false,
                message:"user not created"
            })
    }
}

exports.login = async(req , res)=>{
    try{
        const{email , password} = req.body;
  console.log(password);
        // check if any of the field is not filled yet aka password , email
        if(!email||!password){
           return res.status(400).json({
                success:false,
                message:"Please fill all the field carefully"
            })
        }
        // check for finding the user is in database or not
        let user = await User.findOne({email});

        // if not then  return status as 401 
        if(!user){
            console.log(1);
            return res.status(401).json({
                success:false,
                message:"Please Signup first"
            })
        }
         const payload = {
            email:user.email,
            id : user._id,
            role :user.role
         }
        // comparing the password with the hashed one 
        if(bcrypt.compare(password , user.password)){
                let token = jwt.sign(payload ,process.env.JWT_SECRET,{expiresIn:"2h"} );
                user  = user.toObject();
                user.token = token;
                user.password = undefined;
                const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 *1000),
                httpOnly:true,
                }
               res.cookie("newcookie" , token, options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:"user logged in successfully",
                });
        }
        //wrong password
        else{
            return res.status(403).json({
                success:false,
                message:"Incorrect password try again!"
            })
        }

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"cant login yet failed",
        })
    }
}
