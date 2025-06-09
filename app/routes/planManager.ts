export interface PlanData {
  plan: 'free' | 'pro' | 'premium';
  credits: number;
  lastReset: string;
  isUnlimited: boolean;
}

const PLAN_CREDITS = {
  free: 15,
  pro: 450, // Default pro credits
  premium: 6000, // Default premium credits
};

export const getPlanData = (): PlanData => {
  const stored = localStorage.getItem('planData');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Default free plan
  const defaultData: PlanData = {
    plan: 'free',
    credits: PLAN_CREDITS.free,
    lastReset: new Date().toISOString(),
    isUnlimited: false
  };
  
  localStorage.setItem('planData', JSON.stringify(defaultData));
  return defaultData;
};

export const setPlanData = (data: PlanData) => {
  localStorage.setItem('planData', JSON.stringify(data));
};

export const activatePlan = (plan: 'pro' | 'premium', selectedCredits?: number | 'Unlimited') => {
  const isUnlimited = plan === 'premium' && selectedCredits === 'Unlimited';
  const credits = isUnlimited ? Infinity : (selectedCredits as number) || PLAN_CREDITS[plan];
  
  const planData: PlanData = {
    plan,
    credits: credits as number,
    lastReset: new Date().toISOString(),
    isUnlimited
  };
  
  setPlanData(planData);
};

export const checkAndResetMonthlyCredits = () => {
  const planData = getPlanData();
  const lastReset = new Date(planData.lastReset);
  const now = new Date();
  
  // Check if it's a new month
  if (lastReset.getMonth() !== now.getMonth() || lastReset.getFullYear() !== now.getFullYear()) {
    if (planData.plan === 'free') {
      planData.credits = PLAN_CREDITS.free;
    } else if (!planData.isUnlimited) {
      planData.credits = PLAN_CREDITS[planData.plan];
    }
    planData.lastReset = now.toISOString();
    setPlanData(planData);
  }
  
  return planData;
};

export const getRemainingCredits = () => {
  const planData = checkAndResetMonthlyCredits();
  return planData.isUnlimited ? Infinity : planData.credits;
};

export const useCredits = (amount: number) => {
  const planData = checkAndResetMonthlyCredits();
  
  if (planData.isUnlimited) {
    return true;
  }
  
  if (planData.credits >= amount) {
    planData.credits -= amount;
    setPlanData(planData);
    return true;
  }
  
  return false;
}; 