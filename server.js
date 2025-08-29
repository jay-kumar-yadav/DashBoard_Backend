const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ✅ Allowed origins (Vercel + Localhost)
const allowedOrigins = [
  'https://dash-board-frontend-six.vercel.app', // deployed frontend
  'http://localhost:3000' // local dev
];

// ✅ CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman/curl
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));

// ✅ Connect to MongoDB first
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/dashboard', dashboardRoutes);

  // ✅ Root route for testing
  app.get('/', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to the Dashboard API 🚀'
    });
  });

  // Global error handler
  app.use(errorHandler);

  // Handle undefined routes
  app.all('*', (req, res) => {
    res.status(404).json({
      status: 'error',
      message: `Can't find ${req.originalUrl} on this server!`
    });
  });

  // Start server only after DB is ready
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1); // exit if DB can’t connect
});
