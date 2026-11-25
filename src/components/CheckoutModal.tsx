import { useState, type FormEvent } from 'react';
import { X, Check, ShieldCheck, Lock } from 'lucide-react';
import type { Course } from '../data/courses';

interface CheckoutModalProps {
  course: Course | null;
  onClose: () => void;
}

export function CheckoutModal({ course, onClose }: CheckoutModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'crypto'>('upi');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!course) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please fill in all required checkout fields.');
      return;
    }
    setErrorMsg(null);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFullName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-white/20 text-[#F5F5F5] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Lock className="w-3.5 h-3.5 text-white" />
            <span>256-Bit Encrypted Checkout</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="w-9 h-9 border border-white/20 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <div className="space-y-6 text-center py-6">
              <div className="w-14 h-14 bg-white text-[#080808] rounded-none flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 id="checkout-title" className="font-display text-2xl font-bold text-white">
                  Enrollment Confirmed
                </h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Welcome to MAFIA COURSES, <span className="text-white font-semibold">{fullName}</span>. 
                  Your login credentials and course access link have been dispatched to{' '}
                  <span className="font-mono text-white">{email}</span>.
                </p>
              </div>

              <div className="p-4 bg-[#141414] border border-white/10 text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Course Enrolled:</span>
                  <span className="text-white">{course.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Amount Paid:</span>
                  <span className="text-white">{course.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Transaction ID:</span>
                  <span className="text-white">MAF-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3.5 bg-white text-[#080808] font-semibold text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Access Member Portal Now
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 border-b border-white/10 pb-6">
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  Secure Order Summary
                </p>
                <h3 id="checkout-title" className="font-display text-xl font-bold text-white">
                  {course.title}
                </h3>
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="font-mono text-2xl font-bold text-white">{course.price}</span>
                  <span className="font-mono text-sm text-neutral-500 line-through">
                    {course.originalPrice}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5">
                    Save 65% Today
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-neutral-300">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Sameer Bhaskar"
                    className="w-full px-4 py-3 bg-[#121212] border border-white/20 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-neutral-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-4 py-3 bg-[#121212] border border-white/20 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-neutral-300">Phone Number (WhatsApp / SMS)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-[#121212] border border-white/20 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-medium text-neutral-300">Payment Gateway</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 text-xs font-medium border text-center transition-colors cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'border-white bg-white text-[#080808]'
                          : 'border-white/20 bg-[#121212] text-neutral-300 hover:border-white/50'
                      }`}
                    >
                      UPI / GPay
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 text-xs font-medium border text-center transition-colors cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-white bg-white text-[#080808]'
                          : 'border-white/20 bg-[#121212] text-neutral-300 hover:border-white/50'
                      }`}
                    >
                      Credit / Debit
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('crypto')}
                      className={`p-3 text-xs font-medium border text-center transition-colors cursor-pointer ${
                        paymentMethod === 'crypto'
                          ? 'border-white bg-white text-[#080808]'
                          : 'border-white/20 bg-[#121212] text-neutral-300 hover:border-white/50'
                      }`}
                    >
                      Crypto / USDT
                    </button>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <p role="alert" className="text-xs text-white bg-red-950/80 border border-red-800 p-3">
                  {errorMsg}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-white text-[#080808] font-bold text-sm hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Complete Secure Enrollment ({course.price})</span>
                </button>
                <p className="text-center text-[11px] text-neutral-500 pt-3">
                  Instant digital delivery · Lifetime access · 100% money-back guarantee
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
