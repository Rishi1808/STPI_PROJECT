// middleware/upload.js
const multer = require('multer');
const { uploadFile } = require('../middleware/s3Config');  // Import the upload function

const multerStorage = multer.memoryStorage();  // Store files in memory

const upload = multer({ storage: multerStorage });  // Use memory storage for multer

const uploadFields = upload.fields([
  { name: 'authLetter', maxCount: 1 },
  { name: 'rocCertificate', maxCount: 1 },
  { name: 'casteCertificate', maxCount: 1 },
  { name: 'passportPhotos', maxCount: 1 }
]);

const uploadFilesToS3 = async (req, res, next) => {
  try {
    const files = req.files;
    const uploadedFiles = {};

    // Iterate through each file field to upload to S3
    for (let fieldName in files) {
      const file = files[fieldName][0];  // Get the first file in the array
      const fileUrl = await uploadFile(file);
      uploadedFiles[fieldName] = fileUrl;  // Store the file URL
    }

    // Add the uploaded file URLs to req.filesUrls for further use in form submission
    req.uploadedFiles = uploadedFiles;
    next();  // Proceed to the next middleware (submitForm)
  } catch (error) {
    console.error('Error uploading files to S3:', error);
    res.status(500).send({ message: 'Error uploading files' });
  }
};

module.exports = { uploadFields, uploadFilesToS3 };
