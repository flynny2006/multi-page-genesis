import { atom } from 'nanostores';

interface User {
  username: string;
  password: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

const AUTH_KEY = 'auth_state';
const USERS_KEY = 'users';

// Initialize auth store with default value for SSR
export const authStore = atom<AuthState>({
  isLoggedIn: false,
  user: null,
});

// Initialize auth state on client side
if (typeof window !== 'undefined') {
  const savedAuth = localStorage.getItem(AUTH_KEY);
  if (savedAuth) {
    try {
      authStore.set(JSON.parse(savedAuth));
    } catch {
      // If parsing fails, reset to default state
      authStore.set({ isLoggedIn: false, user: null });
    }
  }
}

// Register a new user
export function register(username: string, password: string): boolean {
  if (typeof window === 'undefined') return false;

  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  
  // Check if username already exists
  if (users.some((user: User) => user.username === username)) {
    return false;
  }

  // Add new user
  users.push({ username, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // Auto login after registration
  login(username, password);
  return true;
}

// Login user
export function login(username: string, password: string): boolean {
  if (typeof window === 'undefined') return false;

  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find((u: User) => u.username === username && u.password === password);

  if (user) {
    const authState = { isLoggedIn: true, user: { username, password } };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
    authStore.set(authState);
    return true;
  }

  return false;
}

// Logout user
export function logout(): void {
  if (typeof window === 'undefined') return;

  const authState = { isLoggedIn: false, user: null };
  localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
  authStore.set(authState);
}

// Check if user is logged in
export function isLoggedIn(): boolean {
  return authStore.get().isLoggedIn;
}

// Get current user
export function getCurrentUser(): User | null {
  return authStore.get().user;
} 