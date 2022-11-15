import React from "react";

// https://dev.to/loonywizard/react-usethrottle-hook-87h

// debounce = return the given value after specified interval so it uses setInterval
export default function useThrottle<T>(value: T, interval = 500): T {
  const [throttledValue, setThrottledValue] = React.useState<T>(value);
  const lastExecuted = React.useRef<number>(Date.now());

  React.useEffect(() => {
    if (Date.now() >= lastExecuted.current + interval) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval);

      return () => clearTimeout(timerId);
    }
  }, [value, interval]);

  return throttledValue;
}

// usage const throttle = useThrottle(value)