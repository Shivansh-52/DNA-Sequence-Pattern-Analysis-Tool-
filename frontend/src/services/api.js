import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const analyzeKMP = async (sequence, pattern) => {
    const response = await api.post('/analyze/kmp', { sequence, pattern });
    return response.data;
};

export const analyzeRabinKarp = async (sequence, pattern) => {
    const response = await api.post('/analyze/rabin-karp', { sequence, pattern });
    return response.data;
};

export const compareAlgorithms = async (sequence, pattern) => {
    const response = await api.post('/analyze/compare', { sequence, pattern });
    return response.data;
};

export const runPerformanceTest = async (pattern) => {
    const response = await api.post('/performance/run', { pattern });
    return response.data;
};

export const getHistory = async () => {
    const response = await api.get('/history');
    return response.data;
};

export const getComparisons = async () => {
    const response = await api.get('/history/comparisons/all');
    return response.data;
};

export const deleteHistory = async (id) => {
    const response = await api.delete(`/history/${id}`);
    return response.data;
};

export default api;
