import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function BrandPreloader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 850);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="fixed inset-0 z-[100] bg-white text-black flex flex-col items-center justify-center px-6 border-b-2 border-black"
        >
          <div className="space-y-4 text-center w-full max-w-xs">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                className="font-display text-2xl sm:text-3xl font-extrabold tracking-tighter text-black"
              >
                MAFIA COURSES
              </motion.p>
            </div>

            <div className="w-full h-[2px] bg-black/15 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.72, ease: EASE_OUT_EXPO }}
                className="h-full bg-black origin-left"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/60"
            >
              6,000+ Courses Vault
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
