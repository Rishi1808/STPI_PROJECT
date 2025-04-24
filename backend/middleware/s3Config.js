// middleware/s3Config.js
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const dotenv = require('dotenv');

dotenv.config();

// Configure S3 client with AWS credentials
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Define S3 Upload logic
const uploadFile = async (file) => {
  try {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${file.fieldname}/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ACL: 'public-read',
      },
    });

    const data = await upload.done();  // Wait for upload to complete
    return data.Location;  // Return the file URL
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;  // Rethrow the error for further handling
  }
};

module.exports = { uploadFile };
