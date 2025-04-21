const Form = require("../models/Form");

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
    const files = req.files;
    const applicationId = await generateApplicationId(); // Generate unique ID

    // Initialize uploadedFiles object for file storage
    const uploadedFiles = {};

    // Process uploaded files if they exist
    if (files) {
      Object.keys(files).forEach((fileType) => {
        if (fileType === "passportPhotos" && files[fileType].length > 0) {
          // Handle multiple passport photos
          uploadedFiles[fileType] = files[fileType].map((photo) => ({
            url: photo.path,
            publicId: photo.filename,
            originalName: photo.originalname,
          }));
        } else if (files[fileType] && files[fileType].length > 0) {
          // Handle single file uploads
          uploadedFiles[fileType] = {
            url: files[fileType][0].path,
            publicId: files[fileType][0].filename,
            originalName: files[fileType][0].originalname,
          };
        }
      });
    }
    console.log("Generated Application ID:", applicationId);
    // Create new form with data and uploaded files
    const newForm = new Form({
      applicationId,
      ...formData,
      uploadedFiles,
      submittedAt: new Date(),
    });

    // Save to database
    const savedForm = await newForm.save();
    console.log("New Form Data Before Save:", { applicationId, ...formData });


    // Send success response
    res.status(201).json({
      success: true,
      message: "Incubation form submitted successfully",
      applicationId, // Include the generated ID in response
      data: savedForm,
    });
  } catch (error) {
    console.error("Form submission error:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting incubation form",
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
    form.adminMessage = message || "No message provided";

    await form.save();

    console.log("✅ Form updated successfully:", {
      applicationStatus: form.applicationStatus,
      adminMessage: form.adminMessage,
    });

    return res.json({
      message: `Form status updated to ${status}`,
      form: {
        applicationStatus: form.applicationStatus,
        adminMessage: form.adminMessage,
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
      message: form.adminMessage || "No message provided",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getApplicationsByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required in query parameters" });
    }

    const applications = await Form.find({ email: email });

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found for this email" });
    }

    res.status(200).json({ count: applications.length, applications });
  } catch (error) {
    console.error("Error fetching applications by email:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { submitForm, getAllForm, getFormByNumber, updateFormStatus,getFormStatus ,getApplicationsByEmail};
