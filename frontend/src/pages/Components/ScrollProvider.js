import React, { createContext, useState, useEffect } from 'react';

const ScrollContext = createContext();

const ScrollProvider = ({ children }) => {
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  const handleScroll = () => {
    // Check the current scroll position
    const currentScrollY = window.scrollY;
    // Compare it with the previous scroll position
    setIsScrollingUp(currentScrollY > (window.previousScrollY || 0));
    // Store the current scroll position for the next comparison
    window.previousScrollY = currentScrollY;
  };

  useEffect(() => {
    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={isScrollingUp}>
      {children}
    </ScrollContext.Provider>
  );
};

export { ScrollContext, ScrollProvider };
