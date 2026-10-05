const express = require('express');
const router = express.Router();
const { getUserProfile, getUserStats } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getUserProfile);
router.get('/stats', protect, getUserStats);

module.exports = router;
