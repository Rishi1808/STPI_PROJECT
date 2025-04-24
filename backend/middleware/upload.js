// middleware/upload.js
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/awsS3');  // Import the AWS S3 configuration
const dotenv = require('dotenv');

dotenv.config();

// Set up multer storage for different fields
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,  // Bucket name
    acl: 'public-read',  // Optional: set permissions
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      // Use field name and timestamp to ensure unique names
      cb(null, `uploads/${file.fieldname}/${Date.now()}_${file.originalname}`);
    },
  }),
});

const uploadFields = upload.fields([
  { name: 'authLetter', maxCount: 1 },
  { name: 'rocCertificate', maxCount: 1 },
  { name: 'casteCertificate', maxCount: 1 },
  { name: 'passportPhotos', maxCount: 1 },
]);

module.exports = { uploadFields };
