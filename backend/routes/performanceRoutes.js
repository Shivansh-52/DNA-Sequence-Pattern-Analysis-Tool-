const express = require('express');
const router = express.Router();
const { runPerformanceTest } = require('../controllers/performanceController');
const { protect } = require('../middleware/authMiddleware');

router.post('/run', protect, runPerformanceTest);

module.exports = router;
