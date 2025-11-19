// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db.js');
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ---------------------------------------
// // CORS (Local + Deployed Frontend)
// // ---------------------------------------
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",                 // local dev
//       "https://stpi-project.onrender.com"      // your frontend on Render
//     ],
//     credentials: true,
//   })
// );


// // middleware configs
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // for connecting to database
// connectDB();

// // routesy
// const userRoutes = require('./routes/userRoute.js');
// const formRoutes = require('./routes/formRoutes.js');
// const adminRoutes = require('./routes/adminRoutes.js');

// app.use('/api/auth', userRoutes);
// app.use('/api/form', formRoutes);
// app.use('/api/admin', adminRoutes);

// // ---------------------------------------
// // Start Server
// // ---------------------------------------
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });





require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------------------------------
// CORS (Local + Deployed Frontend)
// ---------------------------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",                 // local dev
      "https://stpi-project.onrender.com"      // your frontend on Render
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Make sure preflight gets correct response
app.options("*", cors());

// ---------------------------------------
// Middleware
// ---------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------
// Database Connection
// ---------------------------------------
connectDB();

// ---------------------------------------
// Routes
// ---------------------------------------
const userRoutes = require('./routes/userRoute.js');
const formRoutes = require('./routes/formRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');

app.use('/api/auth', userRoutes);
app.use('/api/form', formRoutes);
app.use('/api/admin', adminRoutes);

// ---------------------------------------
// Start Server
// ---------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
