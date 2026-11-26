import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';

interface VelocityMarqueeProps {
  items: string[];
  baseVelocity?: number;
}

export function VelocityMarquee({
  items,
  baseVelocity = -3.5,
}: VelocityMarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 350,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const directionFactor = useRef<number>(1);
  const isHovered = useRef<boolean>(false);

  useAnimationFrame((_, delta) => {
    if (isHovered.current) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const vFactor = velocityFactor.get();
    if (vFactor < 0) {
      directionFactor.current = -1;
    } else if (vFactor > 0) {
      directionFactor.current = 1;
    }

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    moveBy += directionFactor.current * moveBy * Math.min(Math.abs(vFactor), 5);

    let next = baseX.get() + moveBy;
    if (next <= -50) {
      next += 50;
    } else if (next > 0) {
      next -= 50;
    }
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div
      aria-hidden="true"
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
      className="bg-white text-black border-y border-black/15 py-4 overflow-hidden select-none"
    >
      <motion.div style={{ x }} className="flex w-max items-center gap-10">
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex items-center gap-10 whitespace-nowrap"
          >
            <span className="font-display text-xs sm:text-sm font-extrabold tracking-[0.18em] text-black">
              {item}
            </span>
            <span className="text-black/35 font-mono text-xs">/</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
