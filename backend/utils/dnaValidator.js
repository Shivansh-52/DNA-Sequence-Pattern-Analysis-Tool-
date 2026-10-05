const validateDNA = (sequence, pattern) => {
    if (!sequence) {
        return { success: false, message: "DNA sequence is required." };
    }
    if (!pattern) {
        return { success: false, message: "Pattern is required." };
    }
    
    if (pattern.length > sequence.length) {
        return { success: false, message: "Pattern cannot be longer than the DNA sequence." };
    }

    if (sequence.length > 50000) {
         return { success: false, message: "DNA sequence is too large. Maximum length is 50000." };
    }

    const validCharsRegex = /^[ATGCatgc]+$/;

    if (!validCharsRegex.test(sequence)) {
        return { success: false, message: "Invalid DNA sequence. Only A, T, G and C are allowed." };
    }
    if (!validCharsRegex.test(pattern)) {
        return { success: false, message: "Invalid pattern. Only A, T, G and C are allowed." };
    }

    return { success: true, sequence: sequence.toUpperCase(), pattern: pattern.toUpperCase() };
};

module.exports = {
    validateDNA
};
