const buildLPS = (pattern) => {
    const m = pattern.length;
    const lps = new Array(m).fill(0);
    let length = 0;
    let i = 1;

    while (i < m) {
        if (pattern[i] === pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length !== 0) {
                length = lps[length - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
};

const kmpSearch = (text, pattern) => {
    const startTime = process.hrtime.bigint();
    
    const n = text.length;
    const m = pattern.length;
    const positions = [];
    
    if (m === 0) return { algorithm: "KMP", positions: [], count: 0, executionTime: 0, lps: [] };
    
    const lps = buildLPS(pattern);
    let i = 0; // index for text
    let j = 0; // index for pattern

    while (n - i >= m - j) {
        if (pattern[j] === text[i]) {
            j++;
            i++;
        }
        
        if (j === m) {
            positions.push(i - j);
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    const endTime = process.hrtime.bigint();
    const executionTime = Number(endTime - startTime) / 1000000; // milliseconds

    return {
        algorithm: "KMP",
        positions,
        count: positions.length,
        executionTime,
        lps
    };
};

module.exports = {
    buildLPS,
    kmpSearch
};
