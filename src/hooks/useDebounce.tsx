import { useEffect, useState } from 'react';

// I create a custom hook called useDebounce that takes a value and a delay as arguments.
// It returns a debounced value that will only update after the delay has elapsed.
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value after delay
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the previous timer if value changes (and before component unmount)
    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
