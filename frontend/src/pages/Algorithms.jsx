import { useState } from 'react';
import { BookOpen, Search, Zap, Code, Layout, AlignLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Algorithms() {
  const [activeTab, setActiveTab] = useState('kmp');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Algorithm Learning Center</h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Understand the mathematics and logic behind the powerful string matching algorithms used in this platform.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg inline-flex">
          <button
            onClick={() => setActiveTab('kmp')}
            className={`px-6 py-2.5 rounded-md font-medium text-sm transition-all ${
              activeTab === 'kmp' 
                ? 'bg-white shadow-sm text-teal-700' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Knuth-Morris-Pratt (KMP)
          </button>
          <button
            onClick={() => setActiveTab('rk')}
            className={`px-6 py-2.5 rounded-md font-medium text-sm transition-all ${
              activeTab === 'rk' 
                ? 'bg-white shadow-sm text-purple-700' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Rabin-Karp
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-6 py-2.5 rounded-md font-medium text-sm transition-all ${
              activeTab === 'compare' 
                ? 'bg-white shadow-sm text-blue-700' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Comparison Matrix
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
        {activeTab === 'kmp' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8"
          >
            <div className="flex items-center space-x-3 mb-6 border-b pb-4">
              <div className="p-3 bg-teal-100 rounded-lg">
                <Search className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Knuth-Morris-Pratt Algorithm</h2>
                <p className="text-gray-500">O(N + M) Time Complexity</p>
              </div>
            </div>

            <div className="space-y-6 text-gray-700">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-2">
                  <BookOpen className="w-5 h-5 mr-2 text-teal-600" /> What is KMP?
                </h3>
                <p className="leading-relaxed">
                  The KMP matching algorithm uses degenerating property (pattern having same sub-patterns appearing more than once in the pattern) of the pattern and improves the worst case complexity to O(N).
                  The basic idea behind KMP is that whenever we detect a mismatch (after some matches), we already know some of the characters in the text of the next window.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-2">
                  <AlignLeft className="w-5 h-5 mr-2 text-teal-600" /> What is LPS?
                </h3>
                <p className="leading-relaxed mb-4">
                  KMP preprocesses the pattern to construct an auxiliary array called LPS (Longest Prefix Suffix) array.
                  <br /><strong>LPS[i]</strong> = the longest proper prefix of pattern[0..i] which is also a suffix of pattern[0..i].
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium text-sm text-gray-900 mb-3">Example: Pattern = "ABABCABAB"</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm text-center">
                      <thead className="bg-gray-100 font-mono">
                        <tr>
                          <th className="px-3 py-2 text-gray-500">Index</th>
                          <th className="px-3 py-2">0</th><th className="px-3 py-2">1</th>
                          <th className="px-3 py-2">2</th><th className="px-3 py-2">3</th>
                          <th className="px-3 py-2">4</th><th className="px-3 py-2">5</th>
                          <th className="px-3 py-2">6</th><th className="px-3 py-2">7</th>
                          <th className="px-3 py-2">8</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 font-mono">
                        <tr>
                          <td className="px-3 py-2 font-medium bg-gray-50 text-gray-500">Char</td>
                          <td className="px-3 py-2">A</td><td className="px-3 py-2">B</td>
                          <td className="px-3 py-2">A</td><td className="px-3 py-2">B</td>
                          <td className="px-3 py-2">C</td><td className="px-3 py-2">A</td>
                          <td className="px-3 py-2">B</td><td className="px-3 py-2">A</td>
                          <td className="px-3 py-2">B</td>
                        </tr>
                        <tr className="bg-teal-50 text-teal-900 font-bold">
                          <td className="px-3 py-2 font-medium text-teal-700 bg-teal-100">LPS</td>
                          <td className="px-3 py-2">0</td><td className="px-3 py-2">0</td>
                          <td className="px-3 py-2">1</td><td className="px-3 py-2">2</td>
                          <td className="px-3 py-2">0</td><td className="px-3 py-2">1</td>
                          <td className="px-3 py-2">2</td><td className="px-3 py-2">3</td>
                          <td className="px-3 py-2">4</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        )}

        {activeTab === 'rk' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8"
          >
            <div className="flex items-center space-x-3 mb-6 border-b pb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Rabin-Karp Algorithm</h2>
                <p className="text-gray-500">Expected O(N + M) Time Complexity</p>
              </div>
            </div>

            <div className="space-y-6 text-gray-700">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-2">
                  <Code className="w-5 h-5 mr-2 text-purple-600" /> What is Hashing in Rabin-Karp?
                </h3>
                <p className="leading-relaxed">
                  Rabin-Karp algorithm matches the hash value of the pattern with the hash value of current substring of text. If the hash values match, then only it starts matching individual characters.
                  Because calculating the hash of a string of length M takes O(M) time, doing it for every substring would take O(NM). To optimize this, it uses a <strong>Rolling Hash</strong>.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-2">
                  <Layout className="w-5 h-5 mr-2 text-purple-600" /> Rolling Hash Function
                </h3>
                <p className="leading-relaxed mb-4">
                  A rolling hash allows us to compute the hash of the next substring in O(1) time by simply removing the leading character's value and adding the trailing character's value.
                </p>
                <div className="bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm leading-relaxed overflow-x-auto">
                  <code>
                    <span className="text-purple-400">hash</span>(txt[i+1 .. i+M]) = <br/>
                    ( d * (<span className="text-purple-400">hash</span>(txt[i .. i+M-1]) - txt[i]*h) + txt[i+M] ) mod q
                  </code>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Where <strong>d</strong> is the number of characters in the alphabet (e.g. 256), <strong>q</strong> is a prime number, and <strong>h</strong> = d^(M-1) mod q.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-2">
                  <ShieldCheck className="w-5 h-5 mr-2 text-purple-600" /> Character Verification (Spurious Hits)
                </h3>
                <p className="leading-relaxed">
                  Because we take the hash modulo <em>q</em>, two different strings can produce the same hash value (a hash collision). When hash values match, Rabin-Karp explicitly compares the strings character by character to prevent false positives (spurious hits).
                </p>
              </section>
            </div>
          </motion.div>
        )}

        {activeTab === 'compare' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8"
          >
            <div className="flex items-center space-x-3 mb-6 border-b pb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Layout className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Algorithm Comparison</h2>
                <p className="text-gray-500">DAA Complexity Analysis</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Feature</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-teal-700 uppercase tracking-wider bg-teal-50">KMP Algorithm</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-purple-700 uppercase tracking-wider bg-purple-50">Rabin-Karp</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    ['Main Technique', 'LPS Array (Longest Prefix Suffix)', 'Rolling Hash Function'],
                    ['Preprocessing Time', 'O(M)', 'O(M)'],
                    ['Expected Time Complexity', 'O(N + M)', 'O(N + M)'],
                    ['Worst Case Time Complexity', 'O(N)', 'O(N * M) (due to Hash Collisions)'],
                    ['Space Complexity', 'O(M) (For LPS Array)', 'O(1)'],
                    ['Best Use Case', 'When pattern has many recurring sub-patterns', 'Multiple pattern searching, plagiarism detection']
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r">{row[0]}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 border-r">{row[1]}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
