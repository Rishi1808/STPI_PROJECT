const express=require('express');
const router=express.Router();

const {getAllForm}=require('../controller/formController.js')
const { authMiddleware, checkAdmin } = require("../middleware/auth-middleware");

router.get('/getAllForms',authMiddleware,getAllForm);

module.exports = router;