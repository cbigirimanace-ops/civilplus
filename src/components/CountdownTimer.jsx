import { useState, useEffect, useRef } from 'react';
import { Timer } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

function pad(n) {
  return String(n).padStart(2, '0');
}

/**
 * Returns the active end-date for the countdown.
 * Auto-renews: if the stored target has elapsed, we advance it by `hours`
 * (as many cycles as needed) and persist the new target.
 */
function readTarget(key, hours) {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      let date = new Date(stored);
      if (Number.isNaN(date.getTime())) date = null;
      if (date) {
        const cycleMs = hours * 60 * 60 * 1000;
        while (date.getTime() <= Date.now()) {
          date = new Date(date.getTime() + cycleMs);
        }
        localStorage.setItem(key, date.toISOString());
        return date;
      }
    }
  } catch {}
  const target = new Date(Date.now() + hours * 60 * 60 * 1000);
  try { localStorage.setItem(key, target.toISOString()); } catch {}
  return target;
}

export default function CountdownTimer({
  storageKey = 'civilplus_countdown',
  hours = 72,
  showProgress = false,
  sold = 0,
  remaining = 0,
}) {
  const { t } = useI18n();
  const [target, setTarget] = useState(() => readTarget(storageKey, hours));
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const targetRef = useRef(target);

  // Keep ref in sync
  useEffect(() => { targetRef.current = target; }, [target]);

  useEffect(() => {
    const calc = () => {
      const diff = targetRef.current.getTime() - Date.now();
      if (diff <= 0) {
        // Auto-renew
        const next = readTarget(storageKey, hours);
        targetRef.current = next;
        setTarget(next);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [storageKey, hours]);

  const total = sold + remaining;
  const soldPct = total > 0 ? Math.round((sold / total) * 100) : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-card overflow-hidden">
      {showProgress && (
        <>
          <div className="px-4 pt-4 pb-2">
            <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1.5">
              <span>Vendu : <span className="text-primary font-bold">{sold}</span></span>
              <span>Restant : <span className="text-red-500 font-bold">{remaining}</span></span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${soldPct}%` }} />
            </div>
          </div>
          <div className="border-t border-gray-100 mx-4" />
        </>
      )}

      <div className="px-3 py-2.5">
        <p className="text-[10px] md:text-[11px] text-gray-500 text-center mb-1.5 flex items-center justify-center gap-1 font-medium uppercase tracking-wide">
          <Timer size={11} />
          {t('product.countdownTitle')}
        </p>
        <div className="flex items-center justify-center gap-1 md:gap-2">
          {[
            { label: t('product.days'), value: timeLeft.days },
            { label: t('product.hours'), value: timeLeft.hours },
            { label: t('product.minutes'), value: timeLeft.minutes },
            { label: t('product.seconds'), value: timeLeft.seconds },
          ].map(({ label, value }, idx) => (
            <div key={idx} className="flex items-center gap-1 md:gap-2">
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 rounded-md min-w-[42px] md:min-w-[50px] py-1 px-1.5 text-center">
                  <span className="text-lg md:text-xl font-extrabold text-primary font-mono tabular-nums leading-none">
                    {pad(value)}
                  </span>
                </div>
                <span className="text-[9px] text-gray-500 mt-0.5 uppercase tracking-wide">{label}</span>
              </div>
              {idx < 3 && (
                <span className="text-primary font-bold text-base mb-3 select-none">:</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
