const rabinKarpSearch = (text, pattern) => {
    const startTime = process.hrtime.bigint();
    
    const n = text.length;
    const m = pattern.length;
    const positions = [];
    
    if (m === 0) return { algorithm: "Rabin-Karp", positions: [], count: 0, executionTime: 0 };
    if (n < m) {
        const endTime = process.hrtime.bigint();
        return { algorithm: "Rabin-Karp", positions: [], count: 0, executionTime: Number(endTime - startTime) / 1000000 };
    }

    const d = 256; // number of characters in the input alphabet
    const q = 101; // a prime number
    let p = 0; // hash value for pattern
    let t = 0; // hash value for txt
    let h = 1;

    // The value of h would be "pow(d, M-1)%q"
    for (let i = 0; i < m - 1; i++) {
        h = (h * d) % q;
    }

    // Calculate the hash value of pattern and first window of text
    for (let i = 0; i < m; i++) {
        p = (d * p + pattern.charCodeAt(i)) % q;
        t = (d * t + text.charCodeAt(i)) % q;
    }

    // Slide the pattern over text one by one
    for (let i = 0; i <= n - m; i++) {
        // Check the hash values of current window of text and pattern.
        // If the hash values match then only check for characters one by one
        if (p === t) {
            let j;
            for (j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) {
                    break;
                }
            }
            if (j === m) {
                positions.push(i);
            }
        }

        // Calculate hash value for next window of text: Remove leading digit, add trailing digit
        if (i < n - m) {
            t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;

            // We might get negative value of t, converting it to positive
            if (t < 0) {
                t = t + q;
            }
        }
    }

    const endTime = process.hrtime.bigint();
    const executionTime = Number(endTime - startTime) / 1000000; // milliseconds

    return {
        algorithm: "Rabin-Karp",
        positions,
        count: positions.length,
        executionTime
    };
};

module.exports = {
    rabinKarpSearch
};
