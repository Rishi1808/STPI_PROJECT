const express=require('express');
const router=express.Router();

const {getAllForm}=require('../controller/formController.js')
const { authMiddleware, checkAdmin } = require("../middleware/auth-middleware");
const { getFormByNumber } = require("../controller/formController");


router.get('/getAllForms',authMiddleware,checkAdmin,getAllForm);
router.get("/forms/view/:formNumber", authMiddleware,checkAdmin, getFormByNumber);

module.exports = router;