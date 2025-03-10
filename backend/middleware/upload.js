const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
  fileFilter: (req, file, cb) => {
    // Accept images, PDFs, and MS Word documents
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Only JPEG, PNG, PDF, and DOC/DOCX files are allowed.'), false);
    }
  },
});

// Create upload middleware for specific form fields
const uploadMiddleware = upload.fields([
  { name: 'authLetter', maxCount: 1 },
  { name: 'rocCertificate', maxCount: 1 },
  { name: 'casteCertificate', maxCount: 1 },
  { name: 'passportPhotos', maxCount: 5 },
]);

module.exports = uploadMiddleware;