// middleware/s3Config.js
const AWS = require('aws-sdk');

// Load environment variables from .env file
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Fetching from .env
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Fetching from .env
  region: process.env.AWS_REGION, // Fetching from .env
});

const uploadFile = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // Fetching from .env
    Key: `uploads/${Date.now()}_${file.originalname}`, // Generate unique file name
    Body: file.buffer,
    ContentType: file.mimetype, // Set correct MIME type
    //'ACL: 'public-read', // Public read access (adjust as needed)
  };

  try {
    const uploadResponse = await s3.upload(params).promise();
    return uploadResponse.Location; // Return the uploaded file URL
  } catch (error) {
    console.error('S3 upload failed:', error);
    throw new Error('Error uploading file to S3');
  }
};

module.exports = { uploadFile };
