/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

interface Options {
  elementToIgnoreClicksOn?: HTMLElement;
}

export function useOuterClick(callback: VoidFunction, options: Options = {}) {
  const callbackRef = useRef<VoidFunction>();
  const innerRef = useRef<HTMLElement>();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    function handleClick(e: any) {
      const chickWasInElementToIgnore = options?.elementToIgnoreClicksOn
        ? options.elementToIgnoreClicksOn?.contains(e.target)
        : false;

      const clickWasOutsideElement =
        !innerRef.current?.contains(e.target) && !chickWasInElementToIgnore;

      if (innerRef.current && callbackRef.current && clickWasOutsideElement)
        callbackRef.current();
      // callbackRef.current(e);
    }

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  return innerRef;
}

