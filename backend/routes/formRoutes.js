const express = require("express");
const { submitForm } = require("../controller/form.js"); // Ensure the correct import
const router = express.Router();
const upload=require('../middleware/multerConfig.js');
router.post("/submit", upload.array("files", 5),submitForm); 

module.exports = router;
