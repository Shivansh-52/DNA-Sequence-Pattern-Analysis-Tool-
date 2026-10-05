const AnalysisHistory = require('../models/AnalysisHistory');
const ComparisonHistory = require('../models/ComparisonHistory');

const getHistory = async (req, res, next) => {
    try {
        const history = await AnalysisHistory.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .limit(50);
        res.json({ success: true, history });
    } catch (err) {
        next(err);
    }
};

const getHistoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const history = await AnalysisHistory.findOne({ _id: id, user: req.user.id });
        if (!history) {
            return res.status(404).json({ success: false, message: 'History record not found' });
        }
        res.json({ success: true, history });
    } catch (err) {
        next(err);
    }
};

const deleteHistory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await AnalysisHistory.findOneAndDelete({ _id: id, user: req.user.id });
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'History record not found' });
        }
        res.json({ success: true, message: 'Record deleted successfully' });
    } catch (err) {
        next(err);
    }
};

const getComparisons = async (req, res, next) => {
    try {
        const comparisons = await ComparisonHistory.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .limit(50);
        res.json({ success: true, comparisons });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getHistory,
    getHistoryById,
    deleteHistory,
    getComparisons
};
