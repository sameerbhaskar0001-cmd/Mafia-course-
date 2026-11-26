import { forwardRef, type MouseEvent, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Check, Star } from 'lucide-react';
import type { Course } from '../data/courses';
import { ResilientImage } from './ResilientImage';

interface TiltCourseCardProps {
  course: Course;
  index: number;
  onViewDetails: (course: Course) => void;
  onContact: () => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: EASE_OUT_EXPO,
    },
  },
};

export const TiltCourseCard = forwardRef<HTMLElement, TiltCourseCardProps>(
  function TiltCourseCard({ course, onViewDetails, onContact }, forwardedRef) {
    const localRef = useRef<HTMLElement | null>(null);

    const setRefs = (node: HTMLElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
      stiffness: 260,
      damping: 24,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
      stiffness: 260,
      damping: 24,
    });

    const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
      const el = localRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const xPct = (event.clientX - rect.left) / rect.width - 0.5;
      const yPct = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <motion.article
        ref={setRefs}
        layout
        variants={cardVariants}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        className="group relative border border-black/15 bg-white flex flex-col justify-between hover:border-black transition-colors duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_22px_45px_rgba(0,0,0,0.08)]"
      >
        <div>
          <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F7F7] border-b border-black/10">
            <ResilientImage
              src={course.imageSrc}
              alt={course.imageAlt}
              fallbackTitle={course.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            {course.badge && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="absolute top-3 left-3 bg-white text-black border border-black font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider shadow-sm"
              >
                {course.badge}
              </motion.span>
            )}
          </div>

          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-600 font-mono">
              <span>{course.level}</span>
              <div className="flex items-center gap-1 text-black font-semibold">
                <Star className="w-3.5 h-3.5 fill-black text-black" aria-hidden="true" />
                <span className="tabular-nums">
                  {course.rating} ({course.reviewsCount})
                </span>
              </div>
            </div>

            <h3 className="font-display text-xl font-bold text-black tracking-tight">
              {course.title}
            </h3>

            <p className="text-sm text-neutral-700 leading-relaxed">{course.subtitle}</p>

            <div className="space-y-2 pt-3 border-t border-black/10">
              {course.whatYouWillLearn.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-black/80">
                  <Check className="w-4 h-4 text-black shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 pt-0 space-y-5">
          <div className="flex items-baseline justify-between pt-4 border-t border-black/10">
            <div>
              <span className="font-mono tabular-nums text-2xl font-bold text-black">
                {course.price}
              </span>
              <span className="font-mono tabular-nums text-xs text-neutral-400 line-through ml-2">
                {course.originalPrice}
              </span>
            </div>
            <span className="font-mono tabular-nums text-xs text-neutral-600">
              {course.duration}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onViewDetails(course)}
              className="w-full py-3 border border-black/25 bg-white text-xs font-semibold text-black hover:border-black hover:bg-[#F3F3F3] transition-colors duration-150 cursor-pointer whitespace-nowrap"
            >
              View Details
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onContact}
              className="group/btn w-full py-3 bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors duration-150 cursor-pointer inline-flex items-center justify-center gap-1 whitespace-nowrap"
            >
              <span>Contact Us</span>
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                aria-hidden="true"
              />
            </motion.button>
          </div>
        </div>
      </motion.article>
    );
  }
);
