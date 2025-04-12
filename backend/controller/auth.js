
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
//registe controller

const signup = async (req, res) => {
    try {
        // Extract name, email, and password from request body
        const { name, email, password, role } = req.body;

        // Check if user already exists with the same email
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user (without username)
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "user",
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


//login controller

const login = async (req, res) => {
    try {
      const { email, password, role } = req.body; // 👈 include role
  
      // Find user by email
      const currUser = await User.findOne({ email });
  
      if (!currUser) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials or user not found",
        });
      }
  
      // Check if the role matches
      if (currUser.role !== role) {
        return res.status(403).json({
          success: false,
          message: `Unauthorized. Please login through the ${currUser.role} portal.`,
        });
      }
  
      // Check if password matches
      const isMatch = await bcrypt.compare(password, currUser.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }
  
      // Generate JWT
      const accessToken = jwt.sign(
        {
          userId: currUser._id,
          email: currUser.email,
          role: currUser.role,
          name: currUser.name,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15m" }
      );
  
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: accessToken,
        name: currUser.name,
        role: currUser.role,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
  

module.exports = {
    signup,
    login
}