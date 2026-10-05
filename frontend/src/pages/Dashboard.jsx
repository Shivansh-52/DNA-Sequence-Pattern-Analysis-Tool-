import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Activity, Clock, Zap, Target, Search, BarChart, ArrowRight, Dna } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/users/stats');
        setStats(res.data.stats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Dna className="w-12 h-12 text-teal-600 animate-pulse mb-4" />
      <p className="text-gray-500 font-medium">Loading your dashboard...</p>
    </div>
  );

  const statCards = [
    { name: 'Total Analyses', value: stats?.totalAnalyses || 0, icon: Activity, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'KMP Runs', value: stats?.kmpCount || 0, icon: Search, color: 'text-teal-600', bg: 'bg-teal-100' },
    { name: 'Rabin-Karp Runs', value: stats?.rabinKarpCount || 0, icon: Zap, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Patterns Found', value: stats?.totalMatches || 0, icon: Target, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Avg Execution', value: `${(stats?.averageExecutionTime || 0).toFixed(2)} ms`, icon: Clock, color: 'text-rose-600', bg: 'bg-rose-100' },
    { name: 'Preferred Alg', value: stats?.mostUsedAlgorithm || 'N/A', icon: BarChart, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  ];

  const pieData = stats?.chartData?.length ? [
    { name: 'KMP', value: stats.kmpCount },
    { name: 'Rabin-Karp', value: stats.rabinKarpCount }
  ] : [];
  
  const COLORS = ['#0d9488', '#9333ea'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, <span className="font-semibold text-gray-700">{user?.name}</span>! Here's your DNA analysis overview.</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-3">
          <Link to="/analyzer" className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition font-medium text-sm">
            <Activity className="w-4 h-4 mr-2" /> New Analysis
          </Link>
          <Link to="/performance" className="inline-flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition font-medium text-sm">
            <BarChart className="w-4 h-4 mr-2" /> Run Benchmarks
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {statCards.map((item, index) => (
          <motion.div 
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
          >
            <div className="p-6 flex items-center">
              <div className={`rounded-xl p-4 ${item.bg} group-hover:scale-110 transition-transform`}>
                <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                  <dd>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{item.value}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 space-y-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Algorithm Average Execution Time (ms)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={stats?.chartData || []} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                  <Tooltip 
                    cursor={{ fill: '#f3f4f6' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="avgTime" radius={[4, 4, 0, 0]}>
                    {(stats?.chartData || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            <Link to="/history" className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="flex-1">
            {stats?.recentAnalyses?.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-10">
                <Clock className="w-10 h-10 mb-3 text-gray-300" />
                <p>No recent analyses found.</p>
                <Link to="/analyzer" className="mt-2 text-teal-600 font-medium text-sm hover:underline">Run your first test</Link>
              </div>
            ) : (
              <ul className="space-y-4">
                {stats?.recentAnalyses?.map((analysis, i) => (
                  <li key={i} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition border border-transparent hover:border-gray-100">
                    <div className={`p-2 rounded-full ${analysis.algorithm === 'KMP' ? 'bg-teal-100 text-teal-600' : 'bg-purple-100 text-purple-600'}`}>
                      {analysis.algorithm === 'KMP' ? <Search className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {analysis.algorithm} Analysis
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        Found {analysis.occurrenceCount || 0} matches in {(analysis.executionTime || 0).toFixed(2)}ms
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 whitespace-nowrap">
                      {new Date(analysis.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
