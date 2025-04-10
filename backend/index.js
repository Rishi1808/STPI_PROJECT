require('dotenv').config();
const express = require('express');
const connectDB=require('./config/db.js');
const app = express();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// hello world 

const PORT = process.env.PORT || 5000;


//connect to database
connectDB();

//routes
const userRoutes=require('./routes/userRoute.js');
const formRoutes=require('./routes/formRoutes.js')
const adminRoutes=require('./routes/adminRoutes.js')
 // Import upload routes



//middleware -> .json()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 // Serve uploaded files



//routes
app.use('/api/auth', userRoutes);
app.use('/api/form',formRoutes);
app.use('/api/admin',adminRoutes);

 // Use upload routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});