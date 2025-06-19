import { useEffect } from 'react';

export const useDebounce = (
  callback: () => void,
  dependencies: any[],
  delay: number = 500
) => {
  useEffect(() => {
    const timer = setTimeout(callback, delay);
    return () => clearTimeout(timer);
  }, dependencies);
};
