export interface User {
    id: string;
    email: string;
    name: string;
    password: string; // Hashed password
    createdAt: string;
    updatedAt: string;
    lastLogin?: string;
    preferences?: {
      theme?: 'light' | 'dark' | 'system';
      language?: string;
      notifications?: boolean;
    };
    credits?: {
      available: number;
      lastRefill: string;
    };
    tokens?: {
      available: number;
      lastReset: string;
    };
  } 