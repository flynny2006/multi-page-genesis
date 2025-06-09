import { useNavigate } from '@remix-run/react';
import { useState } from 'react';

const CREDIT_OPTIONS = [
  { credits: 450, price: 20 },
  { credits: 500, price: 22 },
  { credits: 550, price: 24 },
  { credits: 600, price: 26 },
  { credits: 660, price: 28 },
  { credits: 750, price: 30 },
  { credits: 850, price: 32 },
  { credits: 1000, price: 34 },
];

const PREMIUM_CREDIT_OPTIONS = [
  { credits: 6000, price: 35 },
  { credits: 7000, price: 37 },
  { credits: 8000, price: 39 },
  { credits: 'Unlimited', price: 45 },
];

export default function PricingPage() {
  const navigate = useNavigate();
  const [selectedCredits, setSelectedCredits] = useState(CREDIT_OPTIONS[0]);
  const [selectedPremiumCredits, setSelectedPremiumCredits] = useState(PREMIUM_CREDIT_OPTIONS[0]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <span className="i-ph:arrow-left w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pricing</h1>
          <div className="w-20" /> {/* Spacer for balance */}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Select the perfect plan for your needs
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Free</h3>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                $0<span className="text-lg text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  15 Credits daily
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  A specified design by default
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  Support Deploying to Vercel & Netlify
                </li>
              </ul>
              <button className="w-full py-3 px-6 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Current Plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-red-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pro</h3>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                ${selectedCredits.price}<span className="text-lg text-gray-500">/month</span>
              </div>
              
              {/* Credit Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Credits
                </label>
                <select
                  value={selectedCredits.credits}
                  onChange={(e) => {
                    const selected = CREDIT_OPTIONS.find(opt => opt.credits === Number(e.target.value));
                    if (selected) setSelectedCredits(selected);
                  }}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {CREDIT_OPTIONS.map((option) => (
                    <option key={option.credits} value={option.credits}>
                      {option.credits} Credits (${option.price}/mo)
                    </option>
                  ))}
                </select>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  {selectedCredits.credits} Credits monthly
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  Any design available
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  Custom Support
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  Custom Domains Support
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  No Supabase limitations
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  Deploy to Vercel, Netlify and Cloudflare
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  No Boongle AI Advertisements / Badges
                </li>
              </ul>
              <button 
                onClick={() => navigate('/upgrade?plan=pro')}
                className="w-full py-3 px-6 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
              >
                Upgrade to Pro
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Premium</h3>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                ${selectedPremiumCredits.price}<span className="text-lg text-gray-500">/month</span>
              </div>

              {/* Premium Credit Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Credits
                </label>
                <select
                  value={selectedPremiumCredits.credits}
                  onChange={(e) => {
                    const selected = PREMIUM_CREDIT_OPTIONS.find(opt => opt.credits === (e.target.value === 'Unlimited' ? 'Unlimited' : Number(e.target.value)));
                    if (selected) setSelectedPremiumCredits(selected);
                  }}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {PREMIUM_CREDIT_OPTIONS.map((option) => (
                    <option key={option.credits} value={option.credits}>
                      {option.credits} Credits (${option.price}/mo)
                    </option>
                  ))}
                </select>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  {selectedPremiumCredits.credits} Credits monthly
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  Any design available
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  Custom Support
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  Custom Domains Support
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  No Supabase limitations
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  Deploy to Vercel, Netlify and Cloudflare
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  No Boongle AI Advertisements / Badges
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="i-ph:check w-5 h-5 text-red-500 mr-2" />
                  Claude 4.0 Sonnet Usage + Advanced Thinking Mode
                </li>
              </ul>
              <button 
                onClick={() => navigate('/upgrade?plan=premium')}
                className="w-full py-3 px-6 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 