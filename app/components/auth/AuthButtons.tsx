import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from '@remix-run/react';

interface AuthButtonsProps {
  onLogin: () => void;
  onRegister: () => void;
  isLoggedIn: boolean;
  username?: string;
  onLogout: () => void;
}

export function AuthButtons({ onLogin, onRegister, isLoggedIn, username, onLogout }: AuthButtonsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  if (isLoggedIn) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all border border-red-500/20"
        >
          <span className="i-ph:user-circle w-5 h-5" />
          <span className="font-medium">{username}</span>
        </button>
        
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-red-100 dark:border-red-800/50"
          >
            <button
              onClick={() => {
                navigate('/pricing');
                setShowDropdown(false);
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => {
                onLogout();
                setShowDropdown(false);
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
            >
              Logout
            </button>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-50">
      <button
        onClick={onLogin}
        className="px-6 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all border border-red-500/20 font-medium"
      >
        Login
      </button>
      <button
        onClick={onRegister}
        className="px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all font-medium shadow-lg shadow-red-500/20"
      >
        Register
      </button>
    </div>
  );
} 