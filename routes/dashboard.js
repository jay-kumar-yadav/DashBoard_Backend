const express = require('express');
const { protect } = require('../middleware/auth');
const { getDashboardData, addProfile } = require('../controllers/dashboardController');

const router = express.Router();

// Protect all routes
router.use(protect);

// Dashboard routes
router.get('/data', getDashboardData);
router.post('/profile', addProfile);

module.exports = router;