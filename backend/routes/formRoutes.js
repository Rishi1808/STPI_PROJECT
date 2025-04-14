const express = require("express");
const { submitForm, getFormByNumber } = require("../controller/formController.js");
const router = express.Router();
const upload = require('../middleware/multerConfig.js');
const { getFormStatus } = require("../controller/formController.js");

// Define the fields your form will need to handle
const uploadFields = upload.fields([
  { name: 'authLetter', maxCount: 1 },
  { name: 'rocCertificate', maxCount: 1 },
  { name: 'casteCertificate', maxCount: 1 },
  { name: 'passportPhotos', maxCount: 5 }
]);

// Route for form submission with multiple file uploads
router.post("/submit", uploadFields, submitForm);

// Route to view form by its number (to track the status)
router.get("/status/:formNumber", getFormStatus);

module.exports = router;
