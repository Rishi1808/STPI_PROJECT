const express = require('express');
const router = express.Router();
const {signup,login}=require('../controller/auth.js');

const {getApplicationsByEmail} = require('../controller/formController.js');
const { authMiddleware } = require("../middleware/auth-middleware");
const {getFormStatus} = require("../controller/formController.js");
//all routes related to auth

router.post('/signup',signup);
router.post('/login',login);
router.get("/applications",authMiddleware, getApplicationsByEmail);
router.get("/getStatus/:formNumber",authMiddleware,getFormStatus)
module.exports=router;