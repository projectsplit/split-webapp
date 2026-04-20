import { useEffect } from 'react';

export const usePrometheusMode = () => {
  useEffect(() => {
    // Add class when Prometheus components mount
    document.documentElement.classList.add('prometheus-mode');
    document.body.classList.add('prometheus-mode');

    // Remove class when Prometheus components unmount
    return () => {
      document.documentElement.classList.remove('prometheus-mode');
      document.body.classList.remove('prometheus-mode');
    };
  }, []);
};
