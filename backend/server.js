require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();


app.use(cors({
  origin: ["https://lead-flhx.vercel.app", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json()); 

connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);


app.get('/', (req, res) => {
  res.send('Lead Management API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
