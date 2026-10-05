import { useState } from 'react';
import { runPerformanceTest } from '../services/api';
import { Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Performance() {
  const [pattern, setPattern] = useState('ATG');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleTest = async () => {
    if (!pattern) {
      setError('Pattern is required');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await runPerformanceTest(pattern);
      setResults(data.results);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Performance Analysis</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <p className="text-gray-600 mb-4">
          This tool generates random DNA sequences of increasing lengths and measures the execution time of both KMP and Rabin-Karp algorithms.
        </p>
        
        {error && (
          <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <div className="flex-1">
            <input 
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md font-mono"
              value={pattern}
              onChange={(e) => setPattern(e.target.value.toUpperCase())}
              placeholder="Pattern (e.g. ATG)"
            />
          </div>
          <button 
            onClick={handleTest}
            disabled={loading}
            className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition flex items-center font-medium whitespace-nowrap"
          >
            {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : null}
            Run Performance Test
          </button>
        </div>
      </div>

      {results && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm h-96">
            <h3 className="text-lg font-medium mb-4">Execution Time Comparison (ms)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="inputSize" label={{ value: 'Sequence Length (N)', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="kmpTime" name="KMP" stroke="#3b82f6" activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="rabinKarpTime" name="Rabin-Karp" stroke="#a855f7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Input Size (N)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KMP Time (ms)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rabin-Karp Time (ms)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((row, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.inputSize.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.kmpTime.toFixed(4)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.rabinKarpTime.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
