import { useState } from 'react';
import { Check, Star, ArrowUpRight, X } from 'lucide-react';
import { COURSES_DATA, TESTIMONIALS, ABOUT_TEXT, type Course } from './data/courses';
import { ResilientImage } from './components/ResilientImage';

export default function App() {
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleTelegramContact = () => {
    window.open('https://t.me/MRMAFIA0007', '_blank', 'noopener,noreferrer');
  };

  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="top" className="min-h-screen bg-[#080808] text-[#F5F5F5] flex flex-col font-sans">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="font-display text-xl sm:text-2xl font-black tracking-tighter text-white whitespace-nowrap shrink-0"
          >
            MAFIA COURSES
          </a>

          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a href="#courses" className="hover:text-white transition-colors">Premium Courses</a>
            <a href="#inside" className="hover:text-white transition-colors">What's Inside</a>
            <a href="#reviews" className="hover:text-white transition-colors">Student Reviews</a>
            <button
              type="button"
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-sm font-medium text-neutral-300 p-0"
            >
              About MAFIA COURSES
            </button>
          </nav>

          <button
            type="button"
            onClick={handleTelegramContact}
            className="px-5 py-2.5 bg-white text-[#080808] text-xs sm:text-sm font-bold hover:bg-neutral-200 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <span>Contact Us</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* Simple Hero Section */}
        <section className="pt-20 pb-24 sm:pt-32 sm:pb-36 px-4 sm:px-8 text-center max-w-4xl mx-auto space-y-8">
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-tight text-white leading-[1.05] text-balance">
            Welcome to MAFIA COURSES
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            India's most powerful and affordable digital learning platform. Get high-end courses on AI, Python, Communication, and Engineering at prices anyone can afford.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={scrollToCourses}
              className="px-8 py-4 bg-white text-[#080808] text-sm font-bold hover:bg-neutral-200 transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore Premium Courses</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleTelegramContact}
              className="px-8 py-4 border border-white/25 text-sm font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Telegram: @MRMAFIA0007</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Premium Courses Section */}
        <section id="courses" className="py-20 px-4 sm:px-8 border-t border-white/10 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">Our Catalog</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Premium Courses
              </h2>
              <p className="text-sm text-neutral-400">
                Best-in-class curriculum designed to make you unstoppable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {COURSES_DATA.map((course) => (
                <div
                  key={course.id}
                  className="border border-white/15 bg-[#0E0E0E] flex flex-col justify-between hover:border-white/40 transition-all duration-200"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#141414] border-b border-white/15">
                      <ResilientImage
                        src={course.imageSrc}
                        alt={course.imageAlt}
                        fallbackTitle={course.title}
                        className="w-full h-full object-cover grayscale contrast-110"
                      />
                      {course.badge && (
                        <span className="absolute top-3 left-3 bg-white text-[#080808] font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
                          {course.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                        <span>{course.level}</span>
                        <div className="flex items-center gap-1 text-white">
                          <Star className="w-3.5 h-3.5 fill-white text-white" />
                          <span>{course.rating} ({course.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="font-display text-xl font-bold text-white tracking-tight">
                        {course.title}
                      </h3>

                      <p className="text-sm text-neutral-300 leading-relaxed">
                        {course.subtitle}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-white/10">
                        {course.whatYouWillLearn.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                            <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 pt-0 space-y-5">
                    <div className="flex items-baseline justify-between pt-4 border-t border-white/10">
                      <div>
                        <span className="font-mono text-2xl font-bold text-white">{course.price}</span>
                        <span className="font-mono text-xs text-neutral-500 line-through ml-2">
                          {course.originalPrice}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-neutral-400">{course.duration}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedCourseForModal(course)}
                        className="w-full py-3 border border-white/25 text-xs font-semibold text-white hover:bg-white hover:text-[#080808] transition-colors cursor-pointer"
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        onClick={handleTelegramContact}
                        className="w-full py-3 bg-white text-[#080808] text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>Contact Us</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is inside MAFIA COURSES? */}
        <section id="inside" className="py-20 px-4 sm:px-8 border-t border-white/10 bg-[#0D0D0D]">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              What is inside MAFIA COURSES?
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              Yaha aapko har tarah ka courses cheap price me mil jayega jo aapko dusro se behtar banayega aur hamare course market me sabse best hai aur kahi aisa nhi milega.
            </p>
          </div>
        </section>

        {/* Student Reviews */}
        <section id="reviews" className="py-20 px-4 sm:px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">Testimonials</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Student Reviews
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="border border-white/15 bg-[#0E0E0E] p-8 flex flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-white">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-white text-white" />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-200 leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="font-display font-bold text-white text-sm">{t.name}</p>
                      <p className="text-xs text-neutral-400">{t.role}</p>
                    </div>
                    <span className="font-mono text-xs text-neutral-300 bg-white/10 border border-white/20 px-2 py-0.5">
                      {t.courseTaken}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-white/10 bg-[#080808] py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
          <span className="font-display text-base font-bold text-white">
            MAFIA COURSES
          </span>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-xs text-neutral-400 p-0"
            >
              About MAFIA COURSES
            </button>
            <a href="#courses" className="hover:text-white transition-colors">Courses</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
            <a href="https://t.me/MRMAFIA0007" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-mono text-white">
              Telegram: @MRMAFIA0007
            </a>
            <span>© 2026 MAFIA COURSES</span>
          </div>
        </div>
      </footer>

      {/* Course Detail Modal */}
      {selectedCourseForModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setSelectedCourseForModal(null)}
        >
          <div
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-white/20 text-[#F5F5F5] p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">{selectedCourseForModal.level}</span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">{selectedCourseForModal.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourseForModal(null)}
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed">{selectedCourseForModal.description}</p>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400">What You Will Learn</h4>
              <div className="space-y-2">
                {selectedCourseForModal.whatYouWillLearn.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <div>
                <span className="font-mono text-2xl font-bold text-white">{selectedCourseForModal.price}</span>
                <span className="font-mono text-xs text-neutral-500 line-through ml-2">{selectedCourseForModal.originalPrice}</span>
              </div>
              <button
                type="button"
                onClick={handleTelegramContact}
                className="px-6 py-3 bg-white text-[#080808] font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Contact on Telegram (@MRMAFIA0007)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About MAFIA COURSES Modal */}
      {isAboutOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setIsAboutOpen(false)}
        >
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-white/20 text-[#F5F5F5] p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-2xl font-bold text-white">About MAFIA COURSES</h3>
              <button
                type="button"
                onClick={() => setIsAboutOpen(false)}
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {ABOUT_TEXT}
            </p>
            <button
              type="button"
              onClick={() => setIsAboutOpen(false)}
              className="w-full py-3 bg-white text-[#080808] font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
