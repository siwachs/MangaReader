import { useEffect, useCallback, useRef } from "react";

export default function useDebounce(
  effect: () => void,
  dependencies: any[],
  delay: number,
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);

    timeoutRef.current = timeout;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [callback, delay]);

  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
}
