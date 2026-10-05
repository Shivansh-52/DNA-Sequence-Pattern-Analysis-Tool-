const User = require('../models/User');
const AnalysisHistory = require('../models/AnalysisHistory');
const ComparisonHistory = require('../models/ComparisonHistory');

exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ success: true, user });
    } catch (err) {
        next(err);
    }
};

exports.getUserStats = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        const totalAnalyses = await AnalysisHistory.countDocuments({ user: userId });
        const kmpCount = await AnalysisHistory.countDocuments({ user: userId, algorithm: 'KMP' });
        const rabinKarpCount = await AnalysisHistory.countDocuments({ user: userId, algorithm: 'Rabin-Karp' });
        
        const analyses = await AnalysisHistory.find({ user: userId }).sort({ createdAt: -1 });
        let totalMatches = 0;
        let totalTime = 0;
        
        // Prepare chart data for algorithm distribution
        let kmpPerformanceSum = 0;
        let rkPerformanceSum = 0;

        analyses.forEach(a => {
            totalMatches += a.occurrenceCount || 0;
            totalTime += a.executionTime || 0;
            if (a.algorithm === 'KMP') kmpPerformanceSum += a.executionTime || 0;
            if (a.algorithm === 'Rabin-Karp') rkPerformanceSum += a.executionTime || 0;
        });
        
        const averageExecutionTime = totalAnalyses > 0 ? (totalTime / totalAnalyses) : 0;
        const mostUsedAlgorithm = kmpCount > rabinKarpCount ? 'KMP' : (rabinKarpCount > kmpCount ? 'Rabin-Karp' : (totalAnalyses > 0 ? 'Equal' : 'N/A'));

        const chartData = [
            { name: 'KMP', usage: kmpCount, avgTime: kmpCount ? kmpPerformanceSum / kmpCount : 0 },
            { name: 'Rabin-Karp', usage: rabinKarpCount, avgTime: rabinKarpCount ? rkPerformanceSum / rabinKarpCount : 0 }
        ];

        const recentAnalyses = analyses.slice(0, 5);

        res.json({
            success: true,
            stats: {
                totalAnalyses,
                kmpCount,
                rabinKarpCount,
                totalMatches,
                averageExecutionTime,
                mostUsedAlgorithm,
                chartData,
                recentAnalyses
            }
        });
    } catch (err) {
        next(err);
    }
};
