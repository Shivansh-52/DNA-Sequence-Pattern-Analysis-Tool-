const mongoose = require('mongoose');

const analysisHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    sequenceLength: {
        type: Number,
        required: true
    },
    pattern: {
        type: String,
        required: true
    },
    patternLength: {
        type: Number,
        required: true
    },
    algorithm: {
        type: String,
        required: true,
        enum: ['KMP', 'Rabin-Karp']
    },
    positions: {
        type: [Number],
        required: true
    },
    occurrenceCount: {
        type: Number,
        required: true
    },
    executionTime: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AnalysisHistory', analysisHistorySchema);
