const express = require('express');
const router = express.Router();
const { getHistory, getHistoryById, deleteHistory, getComparisons } = require('../controllers/historyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getHistory);
router.get('/:id', protect, getHistoryById);
router.delete('/:id', protect, deleteHistory);
router.get('/comparisons/all', protect, getComparisons); // use a sub-path to avoid conflicting with /:id

module.exports = router;
