// middleware/upload.js
const multer = require('multer');
const { uploadFile } = require('../middleware/s3Config');  // Import the upload function

const multerStorage = multer.memoryStorage();  // Store files in memory

const upload = multer({ 
  storage: multerStorage,
  limits: { fileSize: 10 * 1024 * 1024 }  // Set size limit (e.g., 10 MB)
});  // Use memory storage for multer

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

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).send({ message: 'No files uploaded' });
    }

    // Iterate through each field in the form
    for (let fieldName in files) {
      const fieldFiles = files[fieldName];  // This is an array of files for a particular field
      const fileDetails = [];

      // Iterate through each file in the field
      for (let file of fieldFiles) {
        // Optionally validate file type
        if (!['application/pdf'].includes(file.mimetype)) {
          return res.status(400).send({ message: `Invalid file type for ${fieldName}` });
        }

        // Upload the file to S3 and get file info
        const uploadedFileInfo = await uploadFile(file);  // Upload and get the file info

        // Store file info in an array
        fileDetails.push({
          key: uploadedFileInfo.key,
          originalName: uploadedFileInfo.originalName,
        });
      }

      // Store the file details for the field in uploadedFiles
      uploadedFiles[fieldName] = fileDetails;
    }

    // Attach the uploaded files info to the request object
    req.uploadedFiles = uploadedFiles;
    next();
  } catch (error) {
    console.error('Error uploading files to S3:', error);
    res.status(500).send({ message: 'Error uploading files' });
  }
};

module.exports = { uploadFields, uploadFilesToS3 };
