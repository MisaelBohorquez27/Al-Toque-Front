import { useState, useEffect } from 'react';
import { getResponsiveColumns, isMobile } from '../types/responsive';

export const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileDevice, setIsMobileDevice] = useState(isMobile(window.innerWidth));
  const [columns, setColumns] = useState(getResponsiveColumns(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobileDevice(isMobile(width));
      setColumns(getResponsiveColumns(width));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { 
    isMobile: isMobileDevice, 
    columns,
    windowWidth 
  };
};