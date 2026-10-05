const { kmpSearch } = require('../algorithms/kmp');
const { rabinKarpSearch } = require('../algorithms/rabinKarp');
const { validateDNA } = require('../utils/dnaValidator');

const generateRandomDNA = (length) => {
    const chars = 'ATGC';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

const runPerformanceTest = async (req, res, next) => {
    try {
        const { pattern } = req.body;
        
        if (!pattern) {
            return res.status(400).json({ success: false, message: "Pattern is required." });
        }
        
        const validCharsRegex = /^[ATGCatgc]+$/;
        if (!validCharsRegex.test(pattern)) {
             return res.status(400).json({ success: false, message: "Invalid pattern. Only A, T, G and C are allowed." });
        }

        const validPat = pattern.toUpperCase();
        
        const inputSizes = [100, 500, 1000, 2000, 5000, 10000, 20000];
        const results = [];

        for (const size of inputSizes) {
            const sequence = generateRandomDNA(size);
            
            // Warm up JS engine
            kmpSearch(sequence, validPat);
            rabinKarpSearch(sequence, validPat);

            // Actual measurement
            const kmpResult = kmpSearch(sequence, validPat);
            const rkResult = rabinKarpSearch(sequence, validPat);

            results.push({
                inputSize: size,
                kmpTime: kmpResult.executionTime,
                rabinKarpTime: rkResult.executionTime
            });
        }

        res.json({
            success: true,
            results
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    runPerformanceTest
};
