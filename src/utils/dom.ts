import { useEffect, useLayoutEffect } from "react";

const canUseDom = () => {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
};

export const isBrowser = canUseDom();
export const useSafeLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
