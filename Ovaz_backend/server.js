const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

// Routes
const signuproutes = require('./routes/signup');
const loginroutes = require('./routes/login');
const ordersRoute = require("./routes/orders");
const contactRoutes = require('./routes/contact'); // ✅ NEW

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../Ovaz_frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Ovaz_frontend", "home.html"));
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ovazDB')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/signup', signuproutes);
app.use('/api/auth/login', loginroutes);
app.use("/api/orders", ordersRoute);
app.use('/api/contact', contactRoutes); // ✅ NEW

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});




