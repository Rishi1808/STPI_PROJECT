require('dotenv').config();
const express = require('express');
const connectDB=require('./config/db.js');
const app = express();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const PORT = process.env.PORT || 5000;


//connect to database
connectDB();

//routes
const userRoutes=require('./routes/userRoute.js');

//middleware -> .json()
app.use(express.json());



//routes
app.use('/api/auth', userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});