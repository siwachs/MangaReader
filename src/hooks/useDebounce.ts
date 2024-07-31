import { useEffect, useCallback } from "react";

export default function useDebounce(
  effect: () => void,
  dependencies: any[],
  delay: number,
) {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);

    return () => clearTimeout(timeout);
  }, [callback, delay]);
}
