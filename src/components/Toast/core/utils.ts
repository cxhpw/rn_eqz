//@ts-nocheck
export const genId = (() => {
  let count = 0;
  return () => {
    return (++count).toString();
  };
})();

/**
 * 检查是否开启了 减弱动画效果（reduced-motion）
 */
export const prefersReducedMotion = (() => {
  // Cache result
  let shouldReduceMotion: boolean | undefined = undefined;
  return () => {
    if (
      shouldReduceMotion === undefined &&
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function'
    ) {
      const mediaQuery = matchMedia('(prefers-reduced-motion: reduce)');
      shouldReduceMotion = !mediaQuery || mediaQuery.matches;
    }
    return shouldReduceMotion;
  };
})();
