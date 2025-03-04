const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("--------------------")
    console.log("MongoDB connected");
    console.log("--------------------")
  } catch (err) {
    console.log("MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
