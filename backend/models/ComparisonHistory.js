const mongoose = require('mongoose');

const comparisonHistorySchema = new mongoose.Schema({
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
    kmpExecutionTime: {
        type: Number,
        required: true
    },
    rabinKarpExecutionTime: {
        type: Number,
        required: true
    },
    kmpCount: {
        type: Number,
        required: true
    },
    rabinKarpCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ComparisonHistory', comparisonHistorySchema);
