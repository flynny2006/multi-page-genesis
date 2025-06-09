import React, { useState, useEffect } from 'react';
import { IconButton } from '~/components/ui/IconButton';
import Cookies from 'js-cookie';

interface SettingsButtonProps {
  dailyCredits: number;
  maxDailyCredits: number;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({ dailyCredits, maxDailyCredits }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        title="Settings"
        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 flex items-center gap-2"
      >
        <span className="text-xs whitespace-nowrap">Settings</span>
        <div className="i-ph:gear-six w-4 h-4" />
      </IconButton>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-bolt-elements-background-depth-2 rounded-lg p-6 w-[400px] max-w-[90vw] relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"
            >
              <div className="i-ph:x w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-bolt-elements-textPrimary mb-6">Settings</h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-bolt-elements-textSecondary">Daily Credits</span>
                  <span className="text-sm text-bolt-elements-textSecondary">
                    {dailyCredits} / {maxDailyCredits}
                  </span>
                </div>
                <div className="h-2 bg-bolt-elements-background-depth-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 transition-all duration-300 ease-out"
                    style={{ width: `${(dailyCredits / maxDailyCredits) * 100}%` }}
                  />
                </div>
              </div>

              {/* Add more settings sections here */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 