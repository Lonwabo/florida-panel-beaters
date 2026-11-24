import { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { TestimonialsSection } from '../components/TestimonialsSection';

const SURVEY_QUESTIONS = [
  'Overall satisfaction with your repair experience',
  'Professionalism & friendliness of our team',
  'Keeping you informed on repair progress',
  'Work fixed correctly the first time',
];

export function ReviewsPage() {
  const [ratings, setRatings] = useState<Record<number, number>>({
    0: 5,
    1: 5,
    2: 5,
    3: 5,
  });
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-16 bg-[#07080c]">
      <TestimonialsSection />

      {/* Rate Our Service Quick Survey (from original site) */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Thank You for Your Feedback!
              </h3>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                Your anonymous customer satisfaction rating helps us maintain
                our Lightstone-tracked service standards.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-6"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-2">
                  Anonymous Customer Survey
                </p>
                <h3 className="text-2xl font-bold text-white">Rate Our Service</h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Your valued feedback helps us maintain our high standards and
                  deliver exceptional customer care.
                </p>
              </div>

              <div className="space-y-4">
                {SURVEY_QUESTIONS.map((q, idx) => (
                  <div
                    key={q}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10"
                  >
                    <span className="text-xs sm:text-sm text-zinc-200 font-medium">
                      {q}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setRatings((prev) => ({ ...prev, [idx]: star }))
                          }
                          className="p-1 cursor-pointer"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            className={`w-5 h-5 transition-colors ${
                              (ratings[idx] || 0) >= star
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-zinc-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">
                  Additional Comments (Optional)
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what went well or how we can improve..."
                  className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
                />
              </div>

              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-bold text-sm transition-all cursor-pointer"
              >
                Submit Anonymous Survey
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
