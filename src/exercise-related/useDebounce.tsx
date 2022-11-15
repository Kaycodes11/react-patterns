import { useEffect, useRef, useState } from "react";

// debounce = return the given value after specified delay so it uses setTimeout
export function useDebounce<T extends string = "just text">(
  value: T,
  delay: number = 2500
) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  let { current } = useRef<T>(value);
  let reRender = 1;

  useEffect(() => {
    const handler = setTimeout(() => {
      current = value;
      setDebouncedValue(value);
    }, delay);

    return () => {
      // the clean up functions runs when component loads for first time & reloads/re-renders
      console.log("cleanup ", reRender++);

      clearTimeout(handler);
    };
    // only recall this useEffect when value / delay changes
  }, [value, delay]);

  return debouncedValue;
}
