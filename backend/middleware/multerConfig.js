const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary if you're using it
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create storage engine
let storage;

// If using Cloudinary
if (process.env.USE_CLOUDINARY === 'true') {
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'incubation_forms',
      allowed_formats: ['jpg', 'png', 'pdf', 'jpeg', 'doc', 'docx']
    }
  });
} else {
  // If using local storage
  storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
}

// Set up file filter
const fileFilter = (req, file, cb) => {
  // Accept images, PDFs and MS Word documents
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
};

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limit file size to 5MB
  }
});

module.exports = upload;