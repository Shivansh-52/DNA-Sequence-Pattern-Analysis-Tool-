import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Trash2, Search, Clock, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/history');
      setHistory(res.data.history);
    } catch (err) {
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/history/${id}`);
      setHistory(history.filter(h => h._id !== id));
      toast.success('Record deleted');
    } catch (err) {
      toast.error('Failed to delete record');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading history...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analysis History</h1>
        <p className="text-gray-600">Review your past DNA pattern matching results.</p>
      </div>

      {history.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-lg shadow-sm border border-gray-100">
          <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No history found</h3>
          <p className="text-gray-500 mt-1">Run some analyses to see your history here.</p>
        </div>
      ) : (
        <div className="bg-white shadow-sm overflow-hidden sm:rounded-lg border border-gray-100">
          <ul className="divide-y divide-gray-200">
            {history.map((record, index) => (
              <motion.li 
                key={record._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.algorithm === 'KMP' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {record.algorithm === 'KMP' ? <Activity className="w-3 h-3 mr-1" /> : <Zap className="w-3 h-3 mr-1" />}
                        {record.algorithm || 'Unknown'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(record.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-900 font-mono bg-gray-100 p-2 rounded w-fit">
                      Pattern: {record.pattern || 'N/A'}
                    </div>
                    <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
                      <span>Matches: <strong className="text-gray-900">{record.occurrenceCount || 0}</strong></span>
                      <span>Time: <strong className="text-gray-900">{record.executionTime ? record.executionTime.toFixed(4) : '0.0000'} ms</strong></span>
                      <span>Seq Length: <strong className="text-gray-900">{record.sequenceLength || 0}</strong></span>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(record._id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition rounded-full hover:bg-red-50"
                      title="Delete record"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
