import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '~/utils/classNames';
import { useStore } from '@nanostores/react';
import { creditsStore, tokensStore, getNextTokenReset } from '~/lib/stores/credits';

interface CreditStats {
  available: number;
  used: number;
}

interface CreditLog {
  timestamp: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const RESET_HOURS = 16; // Match the constant from credits store
const MAX_TOKENS = 2000000; // 2M tokens per week

export default function CreditsTab() {
  const currentCredits = useStore(creditsStore);
  const currentTokens = useStore(tokensStore);
  const [isLoading, setIsLoading] = useState(true);
  const [creditLogs, setCreditLogs] = useState<CreditLog[]>([]);
  const [nextRefill, setNextRefill] = useState<number>(0);

  useEffect(() => {
    const savedLogs = localStorage.getItem('creditLogs');
    if (savedLogs) {
      setCreditLogs(JSON.parse(savedLogs));
    }
    setIsLoading(false);

    // Calculate next refill time based on credits store data
    const creditsData = localStorage.getItem('daily_credits');
    if (creditsData) {
      try {
        const { lastReset } = JSON.parse(creditsData);
        const lastResetTime = new Date(lastReset).getTime();
        const now = new Date().getTime();
        const hoursSinceLastReset = (now - lastResetTime) / (1000 * 60 * 60);
        const hoursUntilNextRefill = Math.max(0, RESET_HOURS - hoursSinceLastReset);
        setNextRefill(Math.ceil(hoursUntilNextRefill));
      } catch (error) {
        console.error('Error calculating next refill time:', error);
        setNextRefill(0);
      }
    }
  }, []);

  const totalCredits = 15; // Total initial credits
  const usedCredits = totalCredits - currentCredits;
  const usagePercentage = (usedCredits / totalCredits) * 100;

  const usedTokens = MAX_TOKENS - currentTokens;
  const tokensPercentage = (usedTokens / MAX_TOKENS) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* Credit Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-red-100 dark:border-red-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-red-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Credit Overview</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Track your credit usage and availability</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <div className="i-ph:coins w-6 h-6 text-red-500" />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="i-ph:spinner-gap w-8 h-8 text-red-500 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Credit Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={classNames(
                    'p-4 rounded-xl',
                    'bg-red-50 dark:bg-red-900/20',
                    'border border-red-100 dark:border-red-800/50',
                  )}
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Available Credits</div>
                  <div className="text-2xl font-semibold text-red-600 dark:text-red-400">
                    {currentCredits.toLocaleString()}
                  </div>
                </div>
                <div
                  className={classNames(
                    'p-4 rounded-xl',
                    'bg-gray-50 dark:bg-gray-800/50',
                    'border border-gray-200 dark:border-gray-700/50',
                  )}
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Used Credits</div>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {usedCredits.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Token Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={classNames(
                    'p-4 rounded-xl',
                    'bg-purple-50 dark:bg-purple-900/20',
                    'border border-purple-100 dark:border-purple-800/50',
                  )}
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Available Tokens</div>
                  <div className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
                    {currentTokens.toLocaleString()}
                  </div>
                </div>
                <div
                  className={classNames(
                    'p-4 rounded-xl',
                    'bg-gray-50 dark:bg-gray-800/50',
                    'border border-gray-200 dark:border-gray-700/50',
                  )}
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Used Tokens</div>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {usedTokens.toLocaleString()}
                  </div>
                </div>
                <div
                  className={classNames(
                    'p-4 rounded-xl',
                    'bg-blue-50 dark:bg-blue-900/20',
                    'border border-blue-100 dark:border-blue-800/50',
                  )}
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Tokens</div>
                  <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                    {MAX_TOKENS.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Next Refill Info */}
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="i-ph:clock-clockwise w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Next credit refill in</span>
                  </div>
                  <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">{nextRefill} hours</span>
                </div>
              </div>

              {/* Usage Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Usage Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">{usagePercentage.toFixed(1)}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700/50 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${usagePercentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={classNames(
                      'h-full rounded-full',
                      'bg-gradient-to-r from-red-500 to-red-600',
                      'shadow-lg shadow-red-500/20',
                    )}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Credit Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-red-100 dark:border-red-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-red-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How Credits Work</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Understanding the credit system</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <div className="i-ph:info w-6 h-6 text-purple-500" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Credits are the currency that powers your AI interactions. Here's how they work:
              </p>
              <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>You receive 15 credits daily, which refresh every 24 hours</span>
                </li>
                <li className="flex items-start">
                  <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Each AI interaction (like sending a message or generating code) uses 1 credit</span>
                </li>
                <li className="flex items-start">
                  <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Unused credits don't carry over to the next day - use them or lose them!</span>
                </li>
                <li className="flex items-start">
                  <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Monitor your credit usage in real-time through the history below</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Credit History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-red-100 dark:border-red-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-red-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Credit History</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">View your recent credit transactions</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <div className="i-ph:clock-clockwise w-6 h-6 text-purple-500" />
            </div>
          </div>

          <div className="space-y-4">
            {creditLogs.length === 0 ? (
              <div className="text-center py-8">
                <div className="i-ph:chart-line w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No credit history available</p>
              </div>
            ) : (
              <div className="bg-[#1E1E1E] rounded-xl border border-[#333333] overflow-hidden">
                <div className="bg-[#252526] px-4 py-2 border-b border-[#333333] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="text-sm text-gray-400">Credit History Console</div>
                </div>
                <div className="p-4 font-mono text-sm h-[300px] overflow-y-auto modern-scrollbar">
                  {creditLogs.map((log, index) => (
                    <div key={index} className="mb-2">
                      <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                      <span className={`
                        ml-2
                        ${log.type === 'success' ? 'text-green-400' : ''}
                        ${log.type === 'warning' ? 'text-yellow-400' : ''}
                        ${log.type === 'error' ? 'text-red-400' : ''}
                        ${log.type === 'info' ? 'text-blue-400' : ''}
                      `}>
                        {log.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Token Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-red-100 dark:border-red-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-red-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Token Information</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Track your token usage and availability</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <div className="i-ph:info w-6 h-6 text-purple-500" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tokens are the currency that powers your AI interactions. Here's how they work:
              </p>
              <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>You receive 25,000 tokens daily, which refresh every 24 hours</span>
                </li>
                <li className="flex items-start">
                  <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Each AI interaction (like sending a message or generating code) uses 25,000 tokens</span>
                </li>
                <li className="flex items-start">
                  <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Unused tokens don't carry over to the next day - use them or lose them!</span>
                </li>
                <li className="flex items-start">
                  <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Monitor your token usage in real-time through the history below</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Token History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-red-100 dark:border-red-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-red-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Token History</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">View your recent token transactions</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <div className="i-ph:clock-clockwise w-6 h-6 text-purple-500" />
            </div>
          </div>

          <div className="space-y-4">
            {creditLogs.length === 0 ? (
              <div className="text-center py-8">
                <div className="i-ph:chart-line w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No token history available</p>
              </div>
            ) : (
              <div className="bg-[#1E1E1E] rounded-xl border border-[#333333] overflow-hidden">
                <div className="bg-[#252526] px-4 py-2 border-b border-[#333333] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="text-sm text-gray-400">Token History Console</div>
                </div>
                <div className="p-4 font-mono text-sm h-[300px] overflow-y-auto modern-scrollbar">
                  {creditLogs.map((log, index) => (
                    <div key={index} className="mb-2">
                      <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                      <span className={`
                        ml-2
                        ${log.type === 'success' ? 'text-green-400' : ''}
                        ${log.type === 'warning' ? 'text-yellow-400' : ''}
                        ${log.type === 'error' ? 'text-red-400' : ''}
                        ${log.type === 'info' ? 'text-blue-400' : ''}
                      `}>
                        {log.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 