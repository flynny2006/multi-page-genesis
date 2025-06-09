import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '~/utils/classNames';

export default function AboutTab() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* AI Overview Card */}
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI Software Engineer</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your intelligent coding companion</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <div className="i-ph:robot w-6 h-6 text-red-500" />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="i-ph:spinner-gap w-8 h-8 text-red-500 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* AI Capabilities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={classNames(
                    'p-4 rounded-xl',
                    'bg-red-50 dark:bg-red-900/20',
                    'border border-red-100 dark:border-red-800/50',
                  )}
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Key Features</div>
                  <ul className="space-y-2 mt-2">
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2" />
                      Full-stack development expertise
                    </li>
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2" />
                      Modern UI/UX implementation
                    </li>
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2" />
                      Real-time code assistance
                    </li>
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2" />
                      Code review and suggestions
                    </li>
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2" />
                      Automated debugging and error fixing
                    </li>
                  </ul>
                </div>
                <div
                  className={classNames(
                    'p-4 rounded-xl',
                    'bg-gray-50 dark:bg-gray-800/50',
                    'border border-gray-200 dark:border-gray-700/50',
                  )}
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Best Practices</div>
                  <ul className="space-y-2 mt-2">
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2" />
                      Clean code principles
                    </li>
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2" />
                      Security-first approach
                    </li>
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2" />
                      Performance optimization
                    </li>
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2" />
                      Test-driven development awareness
                    </li>
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className="i-ph:check-circle w-4 h-4 text-green-500 mr-2" />
                      Accessibility considerations
                    </li>
                  </ul>
                </div>
              </div>

              {/* Usage Guide */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">How to Use</span>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50">
                  <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 mr-3 flex-shrink-0">1</span>
                      <span>Describe your coding task or problem in natural language</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 mr-3 flex-shrink-0">2</span>
                      <span>The AI will analyze your request and provide a solution with explanations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 mr-3 flex-shrink-0">3</span>
                      <span>Review the code, ask for modifications, or request additional features</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Special Features */}
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Special Features</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">What makes our AI unique</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <div className="i-ph:sparkle w-6 h-6 text-purple-500" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-purple-50 dark:from-red-900/20 dark:to-purple-900/20 border border-red-100 dark:border-red-800/50">
                <div className="flex items-center mb-2">
                  <div className="i-ph:code w-5 h-5 text-red-500 mr-2" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Smart Code Generation</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Generates clean, efficient, and well-documented code following best practices and modern standards.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-100 dark:border-purple-800/50">
                <div className="flex items-center mb-2">
                  <div className="i-ph:lightbulb w-5 h-5 text-purple-500 mr-2" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Intelligent Problem Solving</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Understands complex requirements and provides innovative solutions with detailed explanations.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Underlying Technology */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-blue-100 dark:border-blue-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-blue-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Underlying Technology</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Powered by cutting-edge AI models</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <div className="i-ph:brain w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Our AI software engineer is powered by advanced large language models trained on a massive dataset of code and technical information. These models enable the AI to understand complex coding requests, generate accurate and efficient code, and provide insightful explanations.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              We leverage state-of-the-art natural language processing and machine learning techniques to continuously improve the AI's capabilities and provide you with the best possible coding assistance.
            </p>
          </div>
        </motion.div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-green-100 dark:border-green-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-green-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Future Vision</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Shaping the future of coding</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <div className="i-ph:rocket w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              We are continuously working to expand the AI's knowledge base and capabilities. Our future vision includes supporting a wider range of programming languages and frameworks, offering more advanced debugging and performance analysis tools, and providing personalized learning paths for developers.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Our goal is to create a truly intelligent and collaborative coding partner that empowers developers to build faster, smarter, and more innovative applications.
            </p>
          </div>
        </motion.div>

        {/* Supported Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-orange-100 dark:border-orange-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-orange-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Supported Technologies</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Languages, frameworks, and tools</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <div className="i-ph:code-block w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Our AI is trained on a diverse range of programming languages and frameworks, allowing it to assist you with various projects and technologies. Some of the supported areas include:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>Frontend Development (React, Vue, Angular, HTML, CSS, JavaScript)</li>
              <li>Backend Development (Node.js, Python, Java, Ruby, Go)</li>
              <li>Mobile Development (React Native, Flutter, Swift, Kotlin)</li>
              <li>Databases (SQL, NoSQL)</li>
              <li>Cloud Platforms (AWS, Azure, GCP)</li>
              <li>DevOps Tools</li>
            </ul>
          </div>
        </motion.div>

        {/* Integration & Workflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-teal-100 dark:border-teal-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-teal-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Integration & Workflow</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Seamlessly fits into your development process</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center">
              <div className="i-ph:flowchart w-6 h-6 text-teal-500" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Our AI is designed to integrate smoothly with your existing development workflow. Whether you use a specific IDE, version control system, or project management tool, the AI can adapt to your environment to provide timely and relevant assistance.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Features like real-time code suggestions, automated code reviews, and integrated documentation access are built to enhance your productivity without disrupting your established process.
            </p>
          </div>
        </motion.div>

        {/* Community & Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-yellow-100 dark:border-yellow-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-yellow-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Community & Resources</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Get help, share knowledge, and connect</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
              <div className="i-ph:users w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Join our growing community of developers! Share your experiences, ask questions, and learn from others. We offer various resources to help you get the most out of our AI:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>Comprehensive Documentation</li>
              <li>Tutorials and Guides</li>
              <li>Active User Forums</li>
              <li>Dedicated Support Channel</li>
            </ul>
            <button className="mt-4 px-4 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-yellow-600 transition-colors duration-200"
              onClick={() => window.open('https://discord.gg/hrq9cjXr27', '_blank')}
            >
              Join the Community
            </button>
          </div>
        </motion.div>

        {/* Advanced Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-indigo-100 dark:border-indigo-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-indigo-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Advanced Capabilities</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Solving complex challenges with AI</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
              <div className="i-ph:sparkles w-6 h-6 text-indigo-500" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Beyond basic code generation, our AI is equipped to handle more advanced programming tasks and challenges, such as:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>Refactoring Legacy Code</li>
              <li>Optimizing Algorithms</li>
              <li>Implementing Design Patterns</li>
              <li>Writing Unit and Integration Tests</li>
              <li>Identifying Security Vulnerabilities</li>
              <li>Cross-language Code Translation</li>
            </ul>
          </div>
        </motion.div>

        {/* Learning & Improvement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-pink-100 dark:border-pink-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-pink-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Learning & Improvement</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Continuously getting smarter</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center">
              <div className="i-ph:chart-line w-6 h-6 text-pink-500" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Our AI is constantly learning and evolving. Every interaction helps it understand your needs better and improve its code generation and problem-solving abilities. We use a combination of advanced training techniques and user feedback to enhance its performance.
            </p>
            {/* Placeholder Progress Bars */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Model Training Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">User Feedback Integration</div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Get Involved */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-purple-100 dark:border-purple-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-purple-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Get Involved</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Help us make the AI even better</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <div className="i-ph:heart w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Your feedback is invaluable in shaping the future of our AI software engineer. If you have suggestions, encounter issues, or have ideas for new features, please let us know!
            </p>
            <div className="flex space-x-4 mt-4">
              <button className="px-4 py-2 bg-purple-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-purple-600 transition-colors duration-200">
                Provide Feedback
              </button>
              <button className="px-4 py-2 border border-purple-500 text-purple-700 dark:text-purple-300 text-sm font-semibold rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200">
                Suggest a Feature
              </button>
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-teal-100 dark:border-teal-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-teal-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ensuring safe and secure code</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center">
              <div className="i-ph:shield w-6 h-6 text-teal-500" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Security is a top priority for our AI software engineer. We implement strict security measures to protect your data and ensure that your code is safe and secure.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>Data Encryption</li>
              <li>Access Control</li>
              <li>Regular Security Audits</li>
              <li>Compliance with Industry Standards</li>
            </ul>
          </div>
        </motion.div>

        {/* Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-orange-100 dark:border-orange-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-orange-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Performance</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Optimizing for speed and efficiency</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <div className="i-ph:speed w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Our AI software engineer is designed to be fast and efficient. We use advanced algorithms and optimizations to ensure that your code is generated quickly and efficiently.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Features like real-time code suggestions and automated code reviews help you write faster and more efficient code.
            </p>
          </div>
        </motion.div>

        {/* Customization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-teal-100 dark:border-teal-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-teal-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Customization</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tailoring the AI to your needs</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center">
              <div className="i-ph:paint-brush w-6 h-6 text-teal-500" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Our AI software engineer is highly customizable. You can configure it to suit your specific coding needs and preferences.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>Language Preferences</li>
              <li>Code Style Customization</li>
              <li>Integration with Existing Tools</li>
              <li>User-defined Functions</li>
            </ul>
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-orange-100 dark:border-orange-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-orange-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Use Cases</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Real-world applications of our AI</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <div className="i-ph:code w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Our AI software engineer can be applied to a wide range of use cases, including:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>Code Generation</li>
              <li>Code Review</li>
              <li>Debugging</li>
              <li>Problem Solving</li>
              <li>Code Optimization</li>
              <li>Refactoring</li>
              <li>Security Analysis</li>
              <li>Performance Analysis</li>
              <li>Custom Application Development</li>
            </ul>
          </div>
        </motion.div>

        {/* Troubleshooting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-teal-100 dark:border-teal-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-teal-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Troubleshooting</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Getting help when things go wrong</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center">
              <div className="i-ph:bug w-6 h-6 text-teal-500" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Our AI software engineer is designed to help you troubleshoot and resolve issues quickly and efficiently.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>Error Diagnosis</li>
              <li>Code Fix Suggestions</li>
              <li>Performance Analysis</li>
              <li>Security Analysis</li>
              <li>Code Optimization</li>
            </ul>
          </div>
        </motion.div>

        {/* Release Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className={classNames(
            'p-6 rounded-2xl',
            'bg-white/50 dark:bg-gray-800/50',
            'border border-orange-100 dark:border-orange-800/50',
            'backdrop-blur-sm',
            'shadow-lg shadow-orange-500/5',
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Release Notes</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">What's new and improved</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <div className="i-ph:file-text w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Check out the latest updates and improvements to our AI software engineer.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>New Features</li>
              <li>Bug Fixes</li>
              <li>Performance Enhancements</li>
              <li>Security Updates</li>
              <li>User Interface Improvements</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 