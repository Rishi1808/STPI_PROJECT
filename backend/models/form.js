const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  // Basic Information
  applicationId: {
    type: String,
    unique: true,
    required: true
  }, 
  unitName: {
   // Unique Application ID
    type: String,
    required: [true, 'Unit name is required']
  },
  contactPerson: {
    type: String,
    required: [true, 'Contact person is required']
  },
  authLetterFile: {
    type: Boolean,
    default: false
  },

  // Address Information
  registeredAddress: {
    type: String,
    required: [true, 'Registered address is required']
  },
  branchOffice: String,

  // Status/Classification Details
  status: {
    type: String,
    enum: ['Partnership', 'Individual Promoter', 'Pvt. Ltd. Firm'],
    required: [true, 'Company status is required']
  },
  sc_st: {
    type: Boolean,
    default: false
  },
  women: {
    type: Boolean,
    default: false
  },
  divyangjan: {
    type: Boolean,
    default: false
  },

  // Company Details
  involvement: {
    type: String,
    enum: ['Product Development', 'R&D', 'Others']
  },

  // Registration Details
  pan: {
    type: String,
    required: [true, 'PAN number is required']
  },
  gst: String,

  // Contact Information
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },

  // Directors Information
  boardOfDirectors: String,

  // Bank Details
  AccountNo: String,
  bankName: String,
  bankBranchAdd: String,

  // Visit Details
  dateOfVisit: {
    type: Date
  },
  purposeOfVisit: String,

  // Work Timing
  from: String,
  to: String,

  // Time Period
  months: String,
  years: String,

  // Facility Requirements
  incubation_space: {
    type: String,
    enum: ['plug_play', 'raw', 'others'],
    default: 'plug_play'
  },
  power_backup: String,
  internet_requirement: String,

  // Business Support Facilities
  fax: {
    type: Boolean,
    default: false
  },
  photocopy: {
    type: Boolean,
    default: false
  },
  phone_call: {
    type: Boolean,
    default: false
  },
  conference: {
    type: Boolean,
    default: false
  },

  // Charges
  lease_rent: {
    type: String,
    default: 'As applicable'
  },
  electricity_charges: {
    type: String,
    default: 'As per actual on sub-meter'
  },
  power_backup_charges: {
    type: String,
    default: 'As applicable'
  },
  business_support_facilities: {
    type: String,
    default: 'As applicable'
  },

  // Security Deposit
  dd_no: String,
  dd_date: Date,
  deposit_amount: String,

  // Occupancy
  expected_occupancy_date: Date,

  // File Uploads - Enhanced for Cloudinary integration
  uploadedFiles: {
    authLetter: {
      url: String,
      publicId: String,
      originalName: String
    },
    rocCertificate: {
      url: String,
      publicId: String,
      originalName: String
    },
    casteCertificate: {
      url: String,
      publicId: String,
      originalName: String
    },
    passportPhotos: [
      {
        url: String,
        publicId: String,
        originalName: String
      }
    ]
  },

  // Application Status
  applicationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'], // Ensure 'Accepted' is listed here
    default: 'Pending',
  },
  
  // Admin comments
  adminComments: String,
  
  // 🔴 New field
  rejectionMessage: {
    type: String,
    default: ""
  },

  // Admin comments
  adminComments: String,

  // Submission tracking
  submittedBy: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
























// const mongoose = require("mongoose");

// const formSchema = new mongoose.Schema({
//     dateOfVisit: Date,
//     bankBranchAdd: String,
//     bankName: String,
//     AccountNo: String,
//     boardOfDirectors: String,
//     email: String,
//     gst: String,
//     pan: String,
//     contactPerson: String,
//     unitName: String,
//     authLetterFile: Boolean,
//     registeredAddress: String,
//     status: String,
//     sc_st: Boolean,
//     women: Boolean,
//     divyangjan: Boolean,
//     involvement: String,
//     phone: String,
//     purposeOfVisit: String,
//     from: String,
//     to: String,
//     incubation_space: String,
//     power_backup: String,
//     internet_requirement: String,
//     fax: Boolean,
//     photocopy: Boolean,
//     phone_call: Boolean,
//     conference: Boolean,
//     lease_rent: String,
//     electricity_charges: String,
//     power_backup_charges: String,
//     business_support_facilities: String,
//     dd_no: String,
//     dd_date: Date,
//     deposit_amount: String,
//     expected_occupancy_date: Date,
//     months: String,
//     uploadedFiles: [String]
// });

// const Form = mongoose.model("Form", formSchema);

// module.exports = Form;
