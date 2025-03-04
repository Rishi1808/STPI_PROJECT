const express = require('express');
const router = express.Router();
const {signup,login}=require('../controller/auth.js');



//all routes related to auth

router.post('/signup',signup);
router.post('/login',login);


module.exports=router;