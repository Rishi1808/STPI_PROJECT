const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Register controller (SignUp)
const signup = async (req, res) => {
    try {
        // Extract user details from request body
        const { firstName, lastName, email, password, role, nationality, country, state, district, dob } = req.body;

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

        // Create a new user with the provided fields
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: role || "user", // default role is 'user'
            nationality: nationality || "", // default empty string for nationality
            location: {
                country,
                state,
                district,
            },
            dob,
        });

        // Save the new user to the database
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


// // below this contain a contoller funnction which can be used for both admin and user signup
// const signup = async (req, res) => {
//     try {
//         const {
//             firstName,
//             lastName,
//             email,
//             password,
//             role,
//             nationality,
//             country,
//             state,
//             district,
//             dob
//         } = req.body;

//         // If role is admin → allow minimal fields
//         if (role === "admin") {
//             if (!email || !password) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Email and password required for admin signup"
//                 });
//             }

//             const existingAdmin = await User.findOne({ email });
//             if (existingAdmin) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Admin already exists"
//                 });
//             }

//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(password, salt);

//             const newAdmin = new User({
//                 email,
//                 password: hashedPassword,
//                 role: "admin"
//             });

//             await newAdmin.save();

//             return res.status(201).json({
//                 success: true,
//                 message: "Admin created successfully"
//             });
//         }

//         // ======================
//         // NORMAL USER SIGNUP
//         // ======================

//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User already exists with this email",
//             });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new User({
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword,
//             role: role || "user",
//             nationality: nationality || "",
//             location: { country, state, district },
//             dob,
//         });

//         await newUser.save();

//         res.status(201).json({
//             success: true,
//             message: "User created successfully",
//         });

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };




// Login controller
const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

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

        // Generate JWT token
        const accessToken = jwt.sign(
            {
                userId: currUser._id,
                email: currUser.email,
                role: currUser.role,
                name: currUser.firstName + " " + currUser.lastName, // Use full name
                nationality: currUser.nationality,
                location: currUser.location, // Include location info
                dob: currUser.dob, // Include DOB
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15m" }
        );

        // Send login response with additional details
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: accessToken,
            firstName: currUser.firstName,
            lastName: currUser.lastName,
            email: currUser.email,
            role: currUser.role,
            nationality: currUser.nationality,
            location: currUser.location, // Send location details
            dob: currUser.dob, // Send DOB details
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// bcrypt.compare("456456123", "$2a$10$0YjFhPSv0n6R9TntYS5PDehGc61v7oWiSsszJ9b1E5EdKQhGv9SxC")

module.exports = {
    signup,
    login
};
