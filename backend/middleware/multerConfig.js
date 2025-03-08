const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudnaryConfig");

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "form_uploads", // Cloudinary folder name
    format: async (req, file) => "pdf", // Convert all files to PDFs
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

// Multer Upload Configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = upload;
