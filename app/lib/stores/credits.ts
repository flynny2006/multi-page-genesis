import { atom } from 'nanostores';

const CREDITS_KEY = 'daily_credits';
const TOKENS_KEY = 'weekly_tokens';
const MAX_CREDITS = 15;
const MAX_TOKENS = 2000000; // 2M tokens per week
const TOKENS_PER_MESSAGE = 25000; // 25k tokens per message
const RESET_HOURS = 16;
const REFILL_CODE = '3636';

interface TokenState {
  tokens: number;
  lastReset: string;
}

// Initialize credits store with default value for SSR
export const creditsStore = atom<number>(MAX_CREDITS);
export const tokensStore = atom<number>(MAX_TOKENS);

// Initialize credits and tokens on client side
if (typeof window !== 'undefined') {
  creditsStore.set(getInitialCredits());
  tokensStore.set(getInitialTokens());
}

// Get initial tokens from localStorage or set to max if not found/expired
function getInitialTokens(): number {
  if (typeof window === 'undefined') return MAX_TOKENS;
  
  const storedTokens = localStorage.getItem(TOKENS_KEY);
  if (!storedTokens) {
    return resetTokens();
  }

  try {
    const { tokens, lastReset } = JSON.parse(storedTokens);
    const now = new Date();
    const lastResetDate = new Date(lastReset);
    const daysDiff = (now.getTime() - lastResetDate.getTime()) / (1000 * 60 * 60 * 24);

    // Reset tokens if a week has passed
    if (daysDiff >= 7) {
      return resetTokens();
    }

    return tokens;
  } catch {
    return resetTokens();
  }
}

// Reset tokens to max and update last reset time
function resetTokens(): number {
  if (typeof window === 'undefined') return MAX_TOKENS;

  const tokensData = {
    tokens: MAX_TOKENS,
    lastReset: new Date().toISOString()
  };
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokensData));
  return MAX_TOKENS;
}

// Get initial credits from localStorage or set to max if not found/expired
function getInitialCredits(): number {
  if (typeof window === 'undefined') return MAX_CREDITS;
  
  const storedCredits = localStorage.getItem(CREDITS_KEY);
  if (!storedCredits) {
    return resetCredits();
  }

  try {
    const { credits, lastReset } = JSON.parse(storedCredits);
    const now = new Date();
    const lastResetDate = new Date(lastReset);
    const hoursDiff = (now.getTime() - lastResetDate.getTime()) / (1000 * 60 * 60);

    // Reset credits if RESET_HOURS have passed
    if (hoursDiff >= RESET_HOURS) {
      return resetCredits();
    }

    return credits;
  } catch {
    return resetCredits();
  }
}

// Reset credits to max and update last reset time
function resetCredits(): number {
  if (typeof window === 'undefined') return MAX_CREDITS;

  const creditsData = {
    credits: MAX_CREDITS,
    lastReset: new Date().toISOString()
  };
  localStorage.setItem(CREDITS_KEY, JSON.stringify(creditsData));
  return MAX_CREDITS;
}

// Decrement credits and tokens, return true if successful, false if no credits/tokens left
export function useCredit(): boolean {
  if (typeof window === 'undefined') return false;

  const currentCredits = creditsStore.get();
  const currentTokens = tokensStore.get();

  if (currentCredits <= 0) {
    // Add log for no credits
    const logs = JSON.parse(localStorage.getItem('creditLogs') || '[]');
    logs.unshift({
      timestamp: Date.now(),
      message: '[-] Failed to use credit: No credits available',
      type: 'error'
    });
    localStorage.setItem('creditLogs', JSON.stringify(logs));
    return false;
  }

  if (currentTokens < TOKENS_PER_MESSAGE) {
    // Add log for no tokens
    const logs = JSON.parse(localStorage.getItem('creditLogs') || '[]');
    logs.unshift({
      timestamp: Date.now(),
      message: '[-] Failed to use tokens: Insufficient tokens available',
      type: 'error'
    });
    localStorage.setItem('creditLogs', JSON.stringify(logs));
    return false;
  }

  const newCredits = currentCredits - 1;
  const newTokens = currentTokens - TOKENS_PER_MESSAGE;

  const creditsData = {
    credits: newCredits,
    lastReset: JSON.parse(localStorage.getItem(CREDITS_KEY) || '{}').lastReset
  };
  
  const tokensData = {
    tokens: newTokens,
    lastReset: JSON.parse(localStorage.getItem(TOKENS_KEY) || '{}').lastReset
  };

  localStorage.setItem(CREDITS_KEY, JSON.stringify(creditsData));
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokensData));
  
  creditsStore.set(newCredits);
  tokensStore.set(newTokens);

  // Add log for credit and token usage
  const logs = JSON.parse(localStorage.getItem('creditLogs') || '[]');
  logs.unshift({
    timestamp: Date.now(),
    message: `[+] Credit and ${TOKENS_PER_MESSAGE.toLocaleString()} tokens used by sending a prompt`,
    type: 'success'
  });
  localStorage.setItem('creditLogs', JSON.stringify(logs));

  return true;
}

export function refillCredits(code: string): boolean {
  if (typeof window === 'undefined') return false;
  
  if (code !== REFILL_CODE) {
    return false;
  }

  const newCredits = MAX_CREDITS;
  const creditsData = {
    credits: newCredits,
    lastReset: new Date().toISOString()
  };

  localStorage.setItem(CREDITS_KEY, JSON.stringify(creditsData));
  creditsStore.set(newCredits);
  return true;
}

// Get remaining time until next token reset
export function getNextTokenReset(): string {
  if (typeof window === 'undefined') return '';

  const storedTokens = localStorage.getItem(TOKENS_KEY);
  if (!storedTokens) return '';

  try {
    const { lastReset } = JSON.parse(storedTokens);
    const lastResetDate = new Date(lastReset);
    const nextReset = new Date(lastResetDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const diff = nextReset.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days}d ${hours}h`;
  } catch {
    return '';
  }
}
