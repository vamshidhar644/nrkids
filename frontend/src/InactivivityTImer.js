import React, { useState, useEffect } from 'react';
import { useLogout } from './hooks/useLogout';

const InactiveTimerComponent = () => {
  const [inactiveTime, setInactiveTime] = useState(0);
  const { logout } = useLogout();

  useEffect(() => {
    let inactivityTimer;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(handleInactive, 600000); // 10 minutes (600,000 milliseconds)
    };

    const handleInactive = () => {
      // The function to be called after 10 minutes of inactivity
      logout();
      console.log('Inactive for 10 minutes. logged out', inactiveTime);
    };

    const handleUserActivity = () => {
      setInactiveTime(0); // Reset the inactivity time
      resetInactivityTimer(); // Restart the timer
    };

    // Add event listeners to track user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    // Start the initial inactivity timer
    resetInactivityTimer();

    // Cleanup event listeners on unmount
    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
    };
  }, []);

  return;
};

export default InactiveTimerComponent;
