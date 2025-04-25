// routes/formRoutes.js
const express = require('express');
const { submitForm, getFormStatus } = require('../controller/formController');
const router = express.Router();
const { uploadFields, uploadFilesToS3 } = require('../middleware/upload');
const { getFormDocuments } = require('../controller/formController'); // Import the controller function
// Route for form submission with multiple file uploads
router.post('/submit', uploadFields, uploadFilesToS3, submitForm);

// Route to view form by its number (to track the status)
router.get('/status/:formNumber', getFormStatus);


router.get('/documents/:formId', getFormDocuments);
module.exports = router;
