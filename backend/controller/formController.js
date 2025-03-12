const Form = require('../models/Form');


const submitForm = async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files;
    
    // Initialize uploadedFiles object for file storage
    const uploadedFiles = {};
    
    // Process uploaded files if they exist
    if (files) {
      // Add each file to the uploadedFiles object with its proper category
      Object.keys(files).forEach(fileType => {
        if (fileType === 'passportPhotos' && files[fileType].length > 0) {
          // Handle array of passport photos
          uploadedFiles[fileType] = files[fileType].map(photo => ({
            url: photo.path,
            publicId: photo.filename,
            originalName: photo.originalname
          }));
        } else if (files[fileType] && files[fileType].length > 0) {
          // Handle single files
          uploadedFiles[fileType] = {
            url: files[fileType][0].path,
            publicId: files[fileType][0].filename,
            originalName: files[fileType][0].originalname
          };
        }
      });
    }
    
    // Create new form with data and uploaded files
    const newForm = new Form({
      ...formData,
      uploadedFiles,
      submittedAt: new Date()
    });
    
    // Save the form to database
    const savedForm = await newForm.save();
    
    // Return success response with saved form data
    res.status(201).json({
      success: true,
      message: 'Incubation form submitted successfully',
      data: savedForm
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting incubation form',
      error: error.message
    });
  }
};



module.exports = { submitForm };