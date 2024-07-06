const express = require('express');
const router = express.Router();

const {login, signup} = require('../controllers/auth');
const {auth , isStudent , isAdmin} = require('../middlewares/newauth');
router.post('/login' , login);
router.post('/signup', signup);

//testing route
router.get('/test', auth , (req , res)=>{
    res.json({
       message:"welcome to the protected route of test"
   })
})

//PROTECTED ROUTES
router.get('/student', auth , isStudent , (req , res)=>{
     res.json({
        message:"welcome to the protected route of student"
    })
})
router.get('/admin', auth , isAdmin , (req , res)=>{
    res.json({
       message:"welcome to the protected route of Admin"
   })
})

module.exports = router;