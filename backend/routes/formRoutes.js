const express = require('express');
const router = express.Router();
const {createForm}=require('../controller/form.js');



//all routes related to form

router.post('/submit',createForm);