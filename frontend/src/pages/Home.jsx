import { Link } from 'react-router-dom';
import { Activity, Zap, BarChart2, ShieldCheck, Database, Layout, Dna, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 text-white min-h-[90vh] flex items-center">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-teal-500/20 blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-600/20 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm font-medium mb-6"
            >
              <Dna className="w-4 h-4 mr-2" />
              Advanced Algorithm Platform
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl tracking-tight font-extrabold sm:text-6xl md:text-7xl lg:leading-[1.1]"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Decode</span>
              <span className="block text-white">The Blueprint</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Analyze DNA sequences and compare powerful string-matching algorithms with real execution data. An academic platform bridging molecular biology patterns and software engineering algorithms.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-teal-400 hover:bg-teal-300 shadow-lg hover:shadow-teal-500/30 transition-all duration-200">
                Get Started
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/algorithms" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all duration-200">
                <Activity className="w-5 h-5 mr-2" />
                Learn Algorithms
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:w-1/2 mt-16 lg:mt-0 relative"
          >
            {/* Glassmorphism visual representation */}
            <div className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-8 shadow-2xl">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <div className="space-y-4 font-mono text-sm sm:text-base">
                <div className="flex text-slate-400">
                  <span className="text-teal-400 w-24">Pattern:</span>
                  <span className="text-amber-200 bg-amber-500/20 px-2 rounded">ATGCGAT</span>
                </div>
                <div className="flex text-slate-400 border-b border-white/10 pb-4">
                  <span className="text-teal-400 w-24">Sequence:</span>
                  <span className="break-all tracking-widest text-slate-300">CGT<span className="text-amber-200 bg-amber-500/20 rounded">ATGCGAT</span>CGA<span className="text-amber-200 bg-amber-500/20 rounded">ATGCGAT</span>TAC</span>
                </div>
                <div className="pt-2 text-emerald-400 flex justify-between">
                  <span>&gt; KMP Algorithm</span>
                  <span>0.0124 ms</span>
                </div>
                <div className="text-purple-400 flex justify-between">
                  <span>&gt; Rabin-Karp</span>
                  <span>0.0451 ms</span>
                </div>
                <div className="pt-4 flex justify-between text-slate-500 text-xs">
                  <span>Found 2 matches</span>
                  <span>O(N+M) Expected</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Core Capabilities</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A Better Way to Understand DAA
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            { icon: Activity, title: 'KMP Algorithm', desc: 'Utilizes an LPS array to avoid unnecessary comparisons, achieving O(N+M) time complexity.', color: 'text-teal-600', bg: 'bg-teal-100' },
            { icon: Zap, title: 'Rabin-Karp', desc: 'Employs a rolling hash function to match patterns efficiently in expected O(N+M) time.', color: 'text-purple-600', bg: 'bg-purple-100' },
            { icon: BarChart2, title: 'Performance Analysis', desc: 'Run large-scale tests to compare execution times on varying sequence lengths dynamically.', color: 'text-blue-600', bg: 'bg-blue-100' },
            { icon: ShieldCheck, title: 'Secure Authentication', desc: 'Real user accounts protected with JWT and encrypted passwords.', color: 'text-emerald-600', bg: 'bg-emerald-100' },
            { icon: Database, title: 'Private History', desc: 'Save your DNA analysis results securely to your personal account for later review.', color: 'text-rose-600', bg: 'bg-rose-100' },
            { icon: Layout, title: 'Interactive Dashboard', desc: 'Visualize pattern matches instantly with a clean, scientific interface.', color: 'text-amber-600', bg: 'bg-amber-100' }
          ].map((feature, i) => (
            <motion.div key={i} variants={itemVariants} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-teal-100 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 h-full border border-gray-100 shadow-sm flex flex-col">
                <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-5 w-fit ${feature.bg}`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed flex-1">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
