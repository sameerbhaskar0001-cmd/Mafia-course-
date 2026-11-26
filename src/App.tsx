import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowUp, ArrowUpRight, Check, Star, X } from 'lucide-react';
import {
  ABOUT_TEXT,
  COURSES_DATA,
  TESTIMONIALS,
  type Course,
} from './data/courses';
import { ResilientImage } from './components/ResilientImage';
import { TiltCourseCard } from './components/TiltCourseCard';

type FilterTab = 'All' | 'AI & Code' | 'Business & Ads' | 'Creative';

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: 'All', label: 'All Courses' },
  { id: 'AI & Code', label: 'AI & Code' },
  { id: 'Business & Ads', label: 'Business & Ads' },
  { id: 'Creative', label: 'Creative' },
];

const COURSE_CATEGORY_MAP: Record<string, Exclude<FilterTab, 'All'>> = {
  'be10x-ai': 'AI & Code',
  'python-programming': 'AI & Code',
  'first-crore': 'Business & Ads',
  'google-ads': 'Business & Ads',
  'income-growth': 'Business & Ads',
  'editing-masterclass': 'Creative',
};

const INSIDE_HIGHLIGHTS = [
  {
    index: '01',
    title: '6,000+ Courses Library',
    detail:
      'These 6 featured picks are just the start—access 6,000+ premium courses across every skill.',
  },
  {
    index: '02',
    title: 'Unbeatable Cheap Pricing',
    detail:
      'Premium masterclasses starting at just ₹299 without sacrificing production depth.',
  },
  {
    index: '03',
    title: 'Best in the Market',
    detail:
      'Zero fluff, pure execution-ready frameworks you will not find anywhere else.',
  },
  {
    index: '04',
    title: 'Direct Telegram Access',
    detail: 'Request any course name and get instant access via @MRMAFIA0007.',
  },
];

const MARQUEE_ITEMS = [
  '6,000+ COURSES AVAILABLE',
  'THIS IS JUST THE BEGINNING',
  'MAFIA COURSES VAULT',
  'BE10X AI ACCELERATOR',
  'FIRST 1 CRORE BLUEPRINT',
  'THE EDITING MASTERCLASS',
  'PYTHON PROGRAMMING',
  'GOOGLE ADS TRAINING',
];

const HERO_WORDS = ['Welcome', 'to', 'MAFIA', 'COURSES'];
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function App() {
  const [selectedCourseForModal, setSelectedCourseForModal] =
    useState<Course | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });
  const heroGridY = useTransform(scrollY, [0, 600], [0, 70]);
  const heroShapeRotate = useTransform(scrollY, [0, 800], [0, 28]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 420);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCourseForModal(null);
        setIsAboutOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTelegramContact = () => {
    window.open('https://t.me/MRMAFIA0007', '_blank', 'noopener,noreferrer');
  };

  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCourses =
    activeTab === 'All'
      ? COURSES_DATA
      : COURSES_DATA.filter((course) => COURSE_CATEGORY_MAP[course.id] === activeTab);

  return (
    <MotionConfig reducedMotion="user">
      <div
        id="top"
        className="min-h-screen bg-white text-black flex flex-col font-sans overflow-x-clip"
      >
        {/* Animated Reading Progress Bar */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 h-[3px] bg-black origin-left z-50"
        />

        {/* Navigation Bar (Pure White Background, Black Text) */}
        <header className="sticky top-0 z-40 bg-white border-b border-black/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-8">
            <motion.a
              href="#top"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              whileHover={{ scale: 1.02 }}
              className="font-display text-xl sm:text-2xl font-extrabold tracking-tighter text-black whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              MAFIA COURSES
            </motion.a>

            <nav
              aria-label="Primary navigation"
              className="hidden md:flex items-center gap-8 text-sm font-medium text-black/75"
            >
              <a
                href="#courses"
                className="hover:text-black hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                Premium Courses
              </a>
              <a
                href="#inside"
                className="hover:text-black hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                What&apos;s Inside
              </a>
              <a
                href="#reviews"
                className="hover:text-black hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                Student Reviews
              </a>
              <button
                type="button"
                onClick={() => setIsAboutOpen(true)}
                className="hover:text-black hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer bg-transparent border-none text-sm font-medium text-black/75 p-0"
              >
                About MAFIA COURSES
              </button>
            </nav>

            <motion.button
              type="button"
              onClick={handleTelegramContact}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
              className="group px-5 py-2.5 bg-black text-white text-xs sm:text-sm font-bold hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <span>Contact Us</span>
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </motion.button>
          </div>
        </header>

        <main className="flex-1 bg-white">
          {/* Pure White Hero Section with Parallax Grid, Floating Geometry, & Word Reveal */}
          <section className="relative pt-20 pb-24 sm:pt-32 sm:pb-36 px-4 sm:px-8 overflow-hidden bg-white">
            {/* Scroll-Parallax Monochrome Architectural Grid */}
            <motion.div
              aria-hidden="true"
              style={{ y: heroGridY }}
              className="pointer-events-none absolute inset-0 opacity-[0.055]"
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)',
                  backgroundSize: '56px 56px',
                  maskImage:
                    'radial-gradient(ellipse 80% 70% at 50% 35%, black 35%, transparent 100%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 80% 70% at 50% 35%, black 35%, transparent 100%)',
                }}
              />
            </motion.div>

            {/* Subtle Floating Geometric Wireframes (White canvas, crisp hairline black strokes) */}
            <motion.div
              aria-hidden="true"
              style={{ rotate: heroShapeRotate }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none hidden md:block absolute top-14 left-12 w-24 h-24 border border-black/15"
            />
            <motion.div
              aria-hidden="true"
              animate={{ y: [10, -12, 10], rotate: [0, -8, 0] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none hidden md:block absolute bottom-16 right-14 w-32 h-32 rounded-full border border-black/12"
            />

            <div className="relative max-w-5xl mx-auto text-center space-y-8">
              <h1 className="font-display text-[clamp(2.75rem,7vw,5.75rem)] font-extrabold tracking-tight text-black leading-[1.02] text-balance flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                {HERO_WORDS.map((word, index) => {
                  const isBrand = word === 'MAFIA' || word === 'COURSES';
                  return (
                    <span
                      key={word}
                      className="relative inline-block overflow-hidden py-1"
                    >
                      <motion.span
                        className="inline-block"
                        initial={{ y: '115%', opacity: 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        transition={{
                          duration: 0.7,
                          delay: 0.09 * index,
                          ease: EASE_OUT_EXPO,
                        }}
                      >
                        {word}
                      </motion.span>
                      {isBrand && (
                        <motion.span
                          aria-hidden="true"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: 0.65,
                            delay: 0.52 + index * 0.06,
                            ease: EASE_OUT_EXPO,
                          }}
                          className="absolute bottom-0 left-0 right-0 h-[4px] bg-black origin-left"
                        />
                      )}
                    </span>
                  );
                })}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.42, ease: EASE_OUT_EXPO }}
                className="text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed"
              >
                India&apos;s most powerful and affordable digital learning platform. Get
                high-end courses on AI, Python, Ads, Editing, and Wealth at prices
                anyone can afford.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.56, ease: EASE_OUT_EXPO }}
                className="pt-2 flex flex-wrap items-center justify-center gap-4"
              >
                <motion.button
                  type="button"
                  onClick={scrollToCourses}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                  className="group px-8 py-4 bg-black text-white text-sm font-bold hover:bg-neutral-800 transition-colors cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0 shadow-[0_10px_25px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <span>Explore Premium Courses</span>
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleTelegramContact}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                  className="group px-8 py-4 border border-black/30 bg-white text-sm font-semibold text-black hover:border-black hover:bg-[#F5F5F5] transition-colors cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <span>Telegram: @MRMAFIA0007</span>
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* White-Background Kinetic Marquee Strip with Black Typography */}
          <div
            aria-hidden="true"
            className="bg-white text-black border-y border-black/15 py-4 overflow-hidden select-none"
          >
            <div className="animate-marquee flex items-center gap-10">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
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
            </div>
          </div>

          {/* Pure White Premium Courses Section */}
          <section
            id="courses"
            className="py-20 sm:py-24 px-4 sm:px-8 bg-white border-b border-black/10"
          >
            <div className="max-w-7xl mx-auto space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
              >
                <div className="space-y-3 max-w-2xl">
                  <p className="text-xs font-mono uppercase tracking-widest text-black/65 font-semibold">
                    6,000+ Courses Vault · Featured Selection
                  </p>
                  <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-black text-balance">
                    Premium Courses
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                    These 6 are just the beginning. We hold a massive library of{' '}
                    <span className="font-bold text-black underline underline-offset-4">
                      6,000+ premium courses
                    </span>{' '}
                    across every high-income skill—message us for any course you need.
                  </p>
                </div>

                {/* Shared-Layout Filter Bar */}
                <div
                  role="group"
                  aria-label="Filter courses by category"
                  className="inline-flex items-center gap-1 p-1 bg-white border border-black/20 overflow-x-auto self-start lg:self-auto"
                >
                  {FILTER_TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        aria-pressed={isActive}
                        className={`relative px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
                          isActive
                            ? 'text-white'
                            : 'text-neutral-700 hover:text-black'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="activeCourseFilter"
                            transition={{
                              type: 'spring',
                              stiffness: 380,
                              damping: 32,
                            }}
                            className="absolute inset-0 bg-black z-0"
                          />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Staggered Viewport Fade-In Course Grid */}
              <motion.div
                key={activeTab}
                layout
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredCourses.map((course, idx) => (
                    <TiltCourseCard
                      key={course.id}
                      course={course}
                      index={idx}
                      onViewDetails={setSelectedCourseForModal}
                      onContact={handleTelegramContact}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* 6,000+ Full Vault Callout Strip */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                className="border-2 border-black bg-white p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-[0_14px_34px_rgba(0,0,0,0.06)]"
              >
                <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-black/15 pb-6 lg:pb-0 lg:pr-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-black/60 font-semibold">
                    And This Is Just The Start
                  </p>
                  <p className="font-display text-5xl sm:text-6xl font-extrabold tracking-tighter text-black tabular-nums">
                    6,000+
                  </p>
                  <p className="text-sm font-semibold text-black">
                    Total Courses Inside Our Vault
                  </p>
                </div>

                <div className="lg:col-span-5 space-y-3">
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-black text-balance">
                    Don&apos;t think it stops at 6 courses.
                  </h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Whether you want Stock Market, Dropshipping, UI/UX Design, Cyber
                    Security, Content Creation, or SaaS—we have 6,000+ top-rated courses
                    ready at cheap prices. Tell us what you want to learn.
                  </p>
                  <p className="text-xs font-mono text-black/75 pt-1 leading-relaxed">
                    AI &amp; Automation · Python &amp; Coding · Trading &amp; Finance ·
                    Video Editing · Meta &amp; Google Ads · E-Commerce · Business Scaling
                  </p>
                </div>

                <div className="lg:col-span-3 flex lg:justify-end">
                  <motion.button
                    type="button"
                    onClick={handleTelegramContact}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                    className="group w-full lg:w-auto px-6 py-4 bg-black text-white text-xs sm:text-sm font-bold hover:bg-neutral-800 transition-colors cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>Ask for Any Course</span>
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Pure White "What is inside MAFIA COURSES?" Section with Black Text & Kinetic Grid */}
          <section
            id="inside"
            className="py-24 px-4 sm:px-8 bg-white text-black border-b border-black/15 relative overflow-hidden"
          >
            <div className="max-w-7xl mx-auto space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                className="max-w-3xl mx-auto text-center space-y-6"
              >
                <p className="text-xs font-mono uppercase tracking-widest text-black/65">
                  Why Choose Us
                </p>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-black text-balance">
                  What is inside MAFIA COURSES?
                </h2>
                <motion.div
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT_EXPO }}
                  className="w-24 h-[3px] bg-black mx-auto origin-center"
                />
                <p className="text-base sm:text-lg text-black/85 leading-relaxed">
                  Yaha aapko har tarah ka courses cheap price me mil jayega jo aapko
                  dusro se behtar banayega aur hamare course market me sabse best hai
                  aur kahi aisa nhi milega.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-black/20 divide-y sm:divide-y-0 sm:divide-x divide-black/20 bg-white">
                {INSIDE_HIGHLIGHTS.map((item, idx) => (
                  <motion.div
                    key={item.index}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.09,
                      ease: EASE_OUT_EXPO,
                    }}
                    whileHover={{ y: -5, backgroundColor: '#F7F7F7' }}
                    className="p-7 space-y-3 bg-white transition-colors duration-200"
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.09 + 0.12 }}
                      className="font-mono tabular-nums text-xs text-black/60 block font-semibold"
                    >
                      {item.index}.
                    </motion.span>
                    <h3 className="font-display text-lg font-bold text-black">
                      {item.title}
                    </h3>
                    <p className="text-sm text-black/80 leading-relaxed">
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Pure White Student Reviews Section with Black Text */}
          <section id="reviews" className="py-20 sm:py-24 px-4 sm:px-8 bg-white">
            <div className="max-w-7xl mx-auto space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                className="text-center space-y-3 max-w-xl mx-auto"
              >
                <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                  Testimonials
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
                  Student Reviews
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((t, idx) => (
                  <motion.blockquote
                    key={t.name}
                    initial={{ opacity: 0, y: 28, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -6 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.1,
                      ease: EASE_OUT_EXPO,
                    }}
                    className="border border-black/15 bg-white hover:border-black p-8 flex flex-col justify-between gap-8 transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_18px_36px_rgba(0,0,0,0.08)]"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-1 text-black">
                        {[...Array(5)].map((_, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.3,
                              delay: idx * 0.08 + i * 0.06,
                              ease: EASE_OUT_EXPO,
                            }}
                          >
                            <Star
                              className="w-4 h-4 fill-black text-black"
                              aria-hidden="true"
                            />
                          </motion.span>
                        ))}
                      </div>
                      <p className="text-sm sm:text-base text-black/85 leading-relaxed">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    <footer className="pt-6 border-t border-black/10 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-display font-bold text-black text-sm">
                          {t.name}
                        </p>
                        <p className="text-xs text-neutral-600">{t.role}</p>
                      </div>
                      <span className="font-mono text-xs text-black font-semibold">
                        {t.courseTaken}
                      </span>
                    </footer>
                  </motion.blockquote>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Simple White & Black Footer */}
        <footer className="border-t border-black/10 bg-white py-12 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-700">
            <span className="font-display text-base font-extrabold text-black tracking-tight">
              MAFIA COURSES
            </span>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => setIsAboutOpen(true)}
                className="hover:text-black hover:underline underline-offset-4 transition-colors cursor-pointer bg-transparent border-none text-xs text-neutral-700 p-0"
              >
                About MAFIA COURSES
              </button>
              <a
                href="#courses"
                className="hover:text-black hover:underline underline-offset-4 transition-colors"
              >
                Courses
              </a>
              <a
                href="#reviews"
                className="hover:text-black hover:underline underline-offset-4 transition-colors"
              >
                Reviews
              </a>
              <a
                href="https://t.me/MRMAFIA0007"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-4 font-mono font-bold text-black"
              >
                Telegram: @MRMAFIA0007
              </a>
              <span>© 2026 MAFIA COURSES</span>
            </div>
          </div>
        </footer>

        {/* Floating Back-to-Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              initial={{ opacity: 0, y: 18, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.85 }}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
              className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-white text-black border border-black shadow-xl flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Course Detail Modal (Pure White Background, Black Text, Spring Animation) */}
        <AnimatePresence>
          {selectedCourseForModal && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="course-modal-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4 sm:p-6"
              onClick={() => setSelectedCourseForModal(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 14 }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white border border-black text-black p-6 sm:p-8 space-y-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                  <div>
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                      {selectedCourseForModal.level}
                    </span>
                    <h3
                      id="course-modal-title"
                      className="font-display text-2xl font-bold text-black mt-1"
                    >
                      {selectedCourseForModal.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedCourseForModal(null)}
                    aria-label="Close course details"
                    className="w-9 h-9 border border-black/20 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="aspect-[16/9] overflow-hidden border border-black/10 bg-[#F5F5F5]">
                  <ResilientImage
                    src={selectedCourseForModal.imageSrc}
                    alt={selectedCourseForModal.imageAlt}
                    fallbackTitle={selectedCourseForModal.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-sm text-neutral-700 leading-relaxed">
                  {selectedCourseForModal.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                    What You Will Learn
                  </h4>
                  <div className="space-y-2">
                    {selectedCourseForModal.whatYouWillLearn.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * idx, duration: 0.28 }}
                        className="flex items-start gap-2 text-xs text-black/85"
                      >
                        <Check
                          className="w-4 h-4 text-black shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-black/10">
                  <div>
                    <span className="font-mono tabular-nums text-2xl font-bold text-black">
                      {selectedCourseForModal.price}
                    </span>
                    <span className="font-mono tabular-nums text-xs text-neutral-400 line-through ml-2">
                      {selectedCourseForModal.originalPrice}
                    </span>
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleTelegramContact}
                    className="px-6 py-3 bg-black text-white font-bold text-xs hover:bg-neutral-800 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Contact on Telegram (@MRMAFIA0007)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* About MAFIA COURSES Modal (Pure White Background, Black Text) */}
        <AnimatePresence>
          {isAboutOpen && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="about-modal-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4 sm:p-6"
              onClick={() => setIsAboutOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 14 }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white border border-black text-black p-6 sm:p-8 space-y-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                  <h3
                    id="about-modal-title"
                    className="font-display text-2xl font-bold text-black"
                  >
                    About MAFIA COURSES
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsAboutOpen(false)}
                    aria-label="Close about dialog"
                    className="w-9 h-9 border border-black/20 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                  {ABOUT_TEXT}
                </p>
                <div className="flex items-center gap-3">
                  <motion.button
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleTelegramContact}
                    className="flex-1 py-3 bg-black text-white font-bold text-xs hover:bg-neutral-800 transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
                  >
                    <span>Telegram: @MRMAFIA0007</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => setIsAboutOpen(false)}
                    className="px-6 py-3 border border-black/25 text-black font-bold text-xs hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
