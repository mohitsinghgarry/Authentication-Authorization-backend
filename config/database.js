const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{})
    .then(()=>{
        console.log("database connection succesfull");
    })
    .catch((error)=>{
        console.log("issue in db connection",error.message);
        process.exit(1);
    })
} 
module.exports = dbConnect;