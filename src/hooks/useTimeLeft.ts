import { useEffect, useState } from 'react';

export const useTimeLeft = (expires: string) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const expiry = new Date(expires);
      const diff = expiry.getTime() - now.getTime();
      if (diff < 0) {
        setTimeLeft('Expired');
        clearInterval(interval);
      } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        if (isNaN(minutes) || isNaN(seconds)) {
          setTimeLeft('NaN');
        } else if (minutes === 0) {
          setTimeLeft(`${seconds}s`);
        } else {
          setTimeLeft(`${minutes}m ${seconds}s`);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expires]);

  return timeLeft;
};
