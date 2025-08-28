const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./src/config/db');
const projectRoutes = require('./src/routes/projectRoutes');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// db
connectDB();

// routes (Controller is used behind routes)
app.use('/api', projectRoutes);

// default health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running at http://localhost:${PORT}`));
