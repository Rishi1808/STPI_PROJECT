const Form = require("../models/Form");
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const { getPresignedUrl } = require('../middleware/s3Config');
const generateApplicationId = async () => {
  const year = new Date().getFullYear();

  // Find the last submitted form based on `createdAt` for proper sorting
  const lastForm = await Form.findOne().sort({ createdAt: -1 });

  let nextNumber = 1; // Default start number
  if (lastForm && lastForm.applicationId) {
    const lastId = lastForm.applicationId.split("-")[2]; // Extract last part
    nextNumber = isNaN(parseInt(lastId, 10)) ? 1 : parseInt(lastId, 10) + 1;
  }

  return `APP-${year}-${String(nextNumber).padStart(5, "0")}`;
};

// Form submission function

const submitForm = async (req, res) => {
  try {
    const formData = req.body;
    const files = req.uploadedFiles;
    const applicationId = await generateApplicationId();

    const uploadedFiles = {};

    if (files) {
      for (const fieldName in files) {
        const file = files[fieldName];

        // No need to check for array unless field is passportPhotos
        if (fieldName === "passportPhotos" && Array.isArray(file)) {
          uploadedFiles[fieldName] = file.map(f => ({
            
            publicId: f.key,
            originalName: f.originalName,
          }));
        } else {
          uploadedFiles[fieldName] = {
           
            publicId: file.key,
            originalName: file.originalName,
          };
        }
      }
    }

   


    // Save form data and uploaded files to DB
    const formSubmission = new Form({
      applicationId,
      ...formData,
      uploadedFiles,
    });

    await formSubmission.save();

    res.status(200).send({
      message: "Form submitted successfully",
      form: formSubmission,
    });

  } catch (error) {
    console.error("Error in form submission:", error);
    res.status(500).send({
      message: "Error submitting form",
      error: error.message,
    });
  }
};




const getAllForm= async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json({
      success: true,
      message: "All forms fetched successfully",
      data: forms,
    });
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching forms",
      error: error.message,
    });
  }
};

const getFormByNumber = async (req, res) => {
  try {
    const { formNumber } = req.params;

    const form = await Form.findOne({ applicationId: formNumber });

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    res.status(200).json({
      success: true,
      form,
    });

  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

 // Update with your actual model path

 const updateFormStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, message } = req.body;

    console.log("🟡 Incoming Data:", { applicationId, status, message });

    // Validate status
    const allowedStatuses = ["Accepted", "Rejected"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find the form
    const form = await Form.findOne({ applicationId });

    if (!form) {
      console.log("🔴 Form not found for applicationId:", applicationId);
      return res.status(404).json({ message: "Form not found" });
    }

    // Update form
    form.applicationStatus = status;
    form.rejectionMessage = message || "No message provided";

    await form.save();

    console.log("✅ Form updated successfully:", {
      applicationStatus: form.applicationStatus,
      adminMessage: form.rejectionMessage,
    });

    return res.json({
      message: `Form status updated to ${status}`,
      form: {
        applicationStatus: form.applicationStatus,
        adminMessage: form.rejectionMessage,
      },
    });
  } catch (error) {
    console.error("❌ Server error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


const getFormStatus = async (req, res) => {
  try {
    const formNumber = req.params.formNumber;
    
    // Fetch the form status from the database by form number
    const form = await Form.findOne({ applicationId: formNumber });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Return the status and any relevant message
    return res.json({
      status: form.applicationStatus,
      message: form.rejectionMessage || "No message provided",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getApplicationsByEmail = async (req, res) => {
  try {
    const { email } = req.query; // ✅ use query instead of body

    if (!email) {
      return res.status(400).json({ message: "Email is required in query parameters" });
    }

    const applications = await Form.find({ email });

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found for this email" });
    }

    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    console.error("Error fetching applications by email:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getFormDocuments = async (req, res) => {
  try {
    const formId = req.params.formId;
    const form = await Form.findOne({ applicationId: formId });
    console.log(form);
    if (!form) {
      return res.status(404).send({ message: 'Form not found' });
    }

    const documentLinks = {};

    // Loop over uploaded files and generate presigned URLs
    const files = form.uploadedFiles;

    for (const fieldName in files) {
      const file = files[fieldName];
      const presignedUrl = await getPresignedUrl(file.key);

      documentLinks[fieldName] = {
        url: presignedUrl,
        originalName: file.originalName,
      };
    }

    res.status(200).send({
      message: 'Presigned URLs fetched successfully',
      formId: form,
      documents: documentLinks,
    });

  } catch (error) {
    console.error('Error fetching document URLs:', error);
    res.status(500).send({ message: 'Failed to fetch document URLs' });
  }
};



module.exports = { submitForm, getAllForm, getFormByNumber, updateFormStatus,getFormStatus ,getApplicationsByEmail,getFormDocuments };
