import { useEffect } from 'react';
import { DEBOUNCE_DELAY } from '../constants';

export const useDebounce = (
  callback: () => void,
  dependencies: any[],
  delay: number = DEBOUNCE_DELAY
) => {
  useEffect(() => {
    const timer = setTimeout(callback, delay);
    return () => clearTimeout(timer);
  }, dependencies);
};
