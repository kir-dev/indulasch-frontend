import { useEffect, useRef } from "react";

export function useTimeout(
  callback: () => void,
  delay: number,
  ref: any | undefined
) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setTimeout(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay, ref]);
}
