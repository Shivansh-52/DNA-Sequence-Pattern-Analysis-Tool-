import { useState } from 'react';
import { compareAlgorithms } from '../services/api';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Analyzer() {
  const [sequence, setSequence] = useState('');
  const [pattern, setPattern] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleLoadExample = () => {
    setSequence('ATGCGATACGCTAGCTAGCTAGGATCGATCGATGCTAGCTA');
    setPattern('ATG');
  };

  const handleCompare = async () => {
    if (!sequence || !pattern) {
      setError('Both sequence and pattern are required');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await compareAlgorithms(sequence, pattern);
      setResults(data);
      toast.success('Analysis saved to your history!');
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError(msg);
      toast.error('Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const renderHighlightedSequence = (positions, matchLength) => {
    if (!positions || positions.length === 0) return <span>{sequence}</span>;
    
    let elements = [];
    let lastIndex = 0;

    positions.forEach((pos, i) => {
      elements.push(<span key={`text-${i}`}>{sequence.slice(lastIndex, pos)}</span>);
      elements.push(
        <span key={`match-${i}`} className="bg-yellow-300 font-bold text-yellow-900 px-1 rounded mx-0.5">
          {sequence.slice(pos, pos + matchLength)}
        </span>
      );
      lastIndex = pos + matchLength;
    });

    elements.push(<span key="text-end">{sequence.slice(lastIndex)}</span>);
    return <div className="font-mono text-sm break-all leading-loose">{elements}</div>;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Algorithm Analyzer</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Input Data</h3>
          <button onClick={handleLoadExample} className="text-teal-600 hover:text-teal-700 text-sm font-medium">Load Example</button>
        </div>
        
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">DNA Sequence</label>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md font-mono text-sm"
              rows={4}
              value={sequence}
              onChange={(e) => setSequence(e.target.value.toUpperCase())}
              placeholder="e.g. ATGCGATACGCT..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pattern</label>
            <input 
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md font-mono text-sm"
              value={pattern}
              onChange={(e) => setPattern(e.target.value.toUpperCase())}
              placeholder="e.g. ATG"
            />
          </div>
          <div className="pt-2">
            <button 
              onClick={handleCompare}
              disabled={loading}
              className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition flex justify-center items-center font-medium disabled:opacity-70"
            >
              {loading && <Loader2 className="animate-spin mr-2 h-5 w-5" />}
              Compare Both Algorithms
            </button>
          </div>
        </div>
      </div>

      {results && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500">
              <h3 className="text-xl font-bold mb-4">KMP Algorithm</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Execution Time</span>
                  <span className="font-semibold text-blue-600">{results.kmp.executionTime.toFixed(4)} ms</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Occurrences</span>
                  <span className="font-semibold">{results.kmp.count}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-500">
              <h3 className="text-xl font-bold mb-4">Rabin-Karp</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Execution Time</span>
                  <span className="font-semibold text-purple-600">{results.rabinKarp.executionTime.toFixed(4)} ms</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Occurrences</span>
                  <span className="font-semibold">{results.rabinKarp.count}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Match Visualization</h3>
            <p className="text-sm text-gray-500 mb-4">Found {results.kmp.count} matches in the sequence.</p>
            <div className="bg-gray-50 p-4 rounded border">
              {renderHighlightedSequence(results.kmp.positions, pattern.length)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
