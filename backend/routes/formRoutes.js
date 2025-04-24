// routes/formRoutes.js
const express = require("express");
const { submitForm, getFormStatus } = require("../controller/formController.js");
const router = express.Router();
const { uploadFields } = require("../middleware/upload.js");  // Import the upload middleware

// Route for form submission with multiple file uploads
router.post("/submit", uploadFields, submitForm);

// Route to view form by its number (to track the status)
router.get("/status/:formNumber", getFormStatus);

module.exports = router;
