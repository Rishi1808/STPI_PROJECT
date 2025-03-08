const Form = require("../models/Form");

exports.submitForm = async (req, res) => {
  try {
    // Extract form data from request body
    const formData = req.body;

    // Get Cloudinary file URLs
    const files = req.files.map((file) => file.path);

    // Create new form entry
    const form = new Form({
      ...formData,
      uploadedFiles: files, // Store Cloudinary URLs in MongoDB
    });

    await form.save();
    res.status(201).json({ message: "Form submitted successfully", form });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
