const express = require("express");
const { submitForm } = require("../controller/formController.js");
const router = express.Router();
const upload = require('../middleware/multerConfig.js');

// Define the fields your form will need to handle
const uploadFields = upload.fields([
  { name: 'authLetter', maxCount: 1 },
  { name: 'rocCertificate', maxCount: 1 },
  { name: 'casteCertificate', maxCount: 1 },
  { name: 'passportPhotos', maxCount: 5 }
]);

// Route for form submission with multiple file uploads
router.post("/submit", uploadFields, submitForm); 

module.exports = router;