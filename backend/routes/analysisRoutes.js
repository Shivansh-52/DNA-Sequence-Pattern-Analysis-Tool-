const express = require('express');
const router = express.Router();
const { analyzeKMP, analyzeRabinKarp, compareAlgorithms } = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');

router.post('/kmp', protect, analyzeKMP);
router.post('/rabin-karp', protect, analyzeRabinKarp);
router.post('/compare', protect, compareAlgorithms);

module.exports = router;
