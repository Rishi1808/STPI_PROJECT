const Form = require("../models/Form");

exports.submitForm = async (req, res) => {
  try {
    // Extract ALL form data
    const formData = req.body; 

    // Get uploaded file paths (handle if no files uploaded)
    const files = req.files ? req.files.map((file) => file.path) : [];

    // Create new form entry with all fields
    const newForm = new Form({
      ...formData, // Spread all form data from req.body
      uploadedFiles: files, // Save file paths in MongoDB
    });

    // Save to MongoDB
    await newForm.save();

    res.status(201).json({ message: "Form submitted successfully", newForm });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
