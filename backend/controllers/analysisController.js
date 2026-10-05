const { kmpSearch } = require('../algorithms/kmp');
const { rabinKarpSearch } = require('../algorithms/rabinKarp');
const { validateDNA } = require('../utils/dnaValidator');
const AnalysisHistory = require('../models/AnalysisHistory');
const ComparisonHistory = require('../models/ComparisonHistory');

const analyzeKMP = async (req, res, next) => {
    try {
        const { sequence, pattern } = req.body;
        
        const validation = validateDNA(sequence, pattern);
        if (!validation.success) {
            return res.status(400).json(validation);
        }

        const validSeq = validation.sequence;
        const validPat = validation.pattern;

        const result = kmpSearch(validSeq, validPat);

        // Save history asynchronously
        try {
             if (require('mongoose').connection.readyState === 1) {
                 await AnalysisHistory.create({
                    user: req.user.id,
                    sequenceLength: validSeq.length,
                    pattern: validPat,
                    patternLength: validPat.length,
                    algorithm: 'KMP',
                    positions: result.positions,
                    occurrenceCount: result.count,
                    executionTime: result.executionTime
                });
             }
        } catch (dbErr) {
            console.error("Failed to save history:", dbErr);
        }

        res.json({
            success: true,
            algorithm: "KMP",
            sequenceLength: validSeq.length,
            patternLength: validPat.length,
            positions: result.positions,
            count: result.count,
            executionTime: result.executionTime,
            lps: result.lps
        });
    } catch (err) {
        next(err);
    }
};

const analyzeRabinKarp = async (req, res, next) => {
    try {
        const { sequence, pattern } = req.body;
        
        const validation = validateDNA(sequence, pattern);
        if (!validation.success) {
            return res.status(400).json(validation);
        }

        const validSeq = validation.sequence;
        const validPat = validation.pattern;

        const result = rabinKarpSearch(validSeq, validPat);

         // Save history asynchronously
         try {
            if (require('mongoose').connection.readyState === 1) {
                await AnalysisHistory.create({
                   user: req.user.id,
                   sequenceLength: validSeq.length,
                   pattern: validPat,
                   patternLength: validPat.length,
                   algorithm: 'Rabin-Karp',
                   positions: result.positions,
                   occurrenceCount: result.count,
                   executionTime: result.executionTime
               });
            }
       } catch (dbErr) {
           console.error("Failed to save history:", dbErr);
       }

        res.json({
            success: true,
            algorithm: "Rabin-Karp",
            sequenceLength: validSeq.length,
            patternLength: validPat.length,
            positions: result.positions,
            count: result.count,
            executionTime: result.executionTime
        });
    } catch (err) {
        next(err);
    }
};

const compareAlgorithms = async (req, res, next) => {
    try {
        const { sequence, pattern } = req.body;
        
        const validation = validateDNA(sequence, pattern);
        if (!validation.success) {
            return res.status(400).json(validation);
        }

        const validSeq = validation.sequence;
        const validPat = validation.pattern;

        const kmpResult = kmpSearch(validSeq, validPat);
        const rkResult = rabinKarpSearch(validSeq, validPat);

        const sameResults = JSON.stringify(kmpResult.positions) === JSON.stringify(rkResult.positions);

        try {
            if (require('mongoose').connection.readyState === 1) {
                await AnalysisHistory.create([
                    {
                        user: req.user.id,
                        sequenceLength: validSeq.length,
                        pattern: validPat,
                        patternLength: validPat.length,
                        algorithm: 'KMP',
                        positions: kmpResult.positions,
                        occurrenceCount: kmpResult.count,
                        executionTime: kmpResult.executionTime
                    },
                    {
                        user: req.user.id,
                        sequenceLength: validSeq.length,
                        pattern: validPat,
                        patternLength: validPat.length,
                        algorithm: 'Rabin-Karp',
                        positions: rkResult.positions,
                        occurrenceCount: rkResult.count,
                        executionTime: rkResult.executionTime
                    }
                ]);
            }
        } catch (dbErr) {
            console.error("Failed to save comparison history:", dbErr);
        }

        res.json({
            success: true,
            kmp: {
                positions: kmpResult.positions,
                count: kmpResult.count,
                executionTime: kmpResult.executionTime
            },
            rabinKarp: {
                positions: rkResult.positions,
                count: rkResult.count,
                executionTime: rkResult.executionTime
            },
            sameResults
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    analyzeKMP,
    analyzeRabinKarp,
    compareAlgorithms
};
