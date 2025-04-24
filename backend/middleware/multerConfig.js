const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// CloudinaryStorage setup with dynamic resource_type
let storage;

if (process.env.USE_CLOUDINARY === 'true') {
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      const isImage = file.mimetype.startsWith('image/');
      const isDocument = file.mimetype === 'application/pdf' ||
                         file.mimetype === 'application/msword' ||
                         file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

      return {
        folder: 'incubation_forms',
        resource_type: isImage ? 'image' : isDocument ? 'raw' : 'auto',
        allowed_formats: ['jpg', 'png', 'pdf', 'jpeg', 'doc', 'docx']
      };
    }
  });
} else {
  // Local storage fallback
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
}

// File type filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Unsupported file format. Only JPEG, PNG, PDF, DOC and DOCX are allowed.'
      ),
      false
    );
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
});

module.exports = upload;
