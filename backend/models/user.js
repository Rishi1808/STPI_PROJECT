const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    nationality: {
      type: String,
      default: "", // Default empty string for nationality
    },
    location: {
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
    },
    dob: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);



// below this code can be used for adding admins with minimal fields

// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema(
//   {
//     firstName: {
//       type: String,
//       trim: true,
//       default: ""
//     },
//     lastName: {
//       type: String,
//       trim: true,
//       default: ""
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },
//     nationality: {
//       type: String,
//       default: "",
//     },
//     location: {
//       country: {
//         type: String,
//         default: "",
//       },
//       state: {
//         type: String,
//         default: "",
//       },
//       district: {
//         type: String,
//         default: "",
//       },
//     },
//     dob: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", UserSchema);
