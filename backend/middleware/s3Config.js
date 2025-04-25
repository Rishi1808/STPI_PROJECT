const AWS = require('aws-sdk');

// Load environment variables from .env file
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Upload file to S3
const uploadFile = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const uploadResponse = await s3.upload(params).promise();

    return {
      key: uploadResponse.Key,        // S3 object key (for later access)
      originalName: file.originalname // Original file name for display
    };

  } catch (error) {
    console.error('S3 upload failed:', error);
    throw new Error('Error uploading file to S3');
  }
};

// Generate a presigned URL for accessing an uploaded file
const getPresignedUrl = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Expires: 60 * 5 // URL valid for 5 minutes
  };

  try {
    const url = await s3.getSignedUrlPromise('getObject', params);
    return url;
  } catch (error) {
    console.error('Failed to generate presigned URL:', error);
    throw new Error('Error generating presigned URL');
  }
};

module.exports = { uploadFile, getPresignedUrl };
