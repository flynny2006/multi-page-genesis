import { getPlanData, getRemainingCredits } from '~/utils/planManager';

export default function CreditsTab() {
  const planData = getPlanData();
  const remainingCredits = getRemainingCredits();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Credits</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Current Plan</h3>
            <p className="text-gray-600 dark:text-gray-400 capitalize">{planData.plan}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Remaining Credits</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {planData.isUnlimited ? 'Unlimited' : remainingCredits}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Monthly Reset</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {new Date(planData.lastReset).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 