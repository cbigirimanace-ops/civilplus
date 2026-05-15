import { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

function pad(n) {
  return String(n).padStart(2, '0');
}

function getTargetDate(key, hours = 72) {
  const stored = sessionStorage.getItem(key);
  if (stored) {
    const date = new Date(stored);
    if (date > new Date()) return date;
  }
  const target = new Date(Date.now() + hours * 60 * 60 * 1000);
  sessionStorage.setItem(key, target.toISOString());
  return target;
}

export default function CountdownTimer({
  storageKey = 'civilplus_countdown',
  hours = 72,
  showProgress = false,
  sold = 0,
  remaining = 0,
}) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [targetDate] = useState(() => getTargetDate(storageKey, hours));

  useEffect(() => {
    const calc = () => {
      const diff = targetDate - new Date();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
  }, [targetDate]);

  const total = sold + remaining;
  const soldPct = total > 0 ? Math.round((sold / total) * 100) : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-card overflow-hidden">
      {/* Optional Sold / Remaining bar */}
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
            <p className="text-xs text-red-500 font-semibold mt-1.5 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Offre à durée limitée
            </p>
          </div>
          <div className="border-t border-gray-100 mx-4" />
        </>
      )}

      {/* Timer (always shown) */}
      <div className="px-4 py-4">
        <p className="text-xs text-gray-500 text-center mb-3 flex items-center justify-center gap-1.5 font-medium uppercase tracking-wide">
          <Timer size={13} />
          L'offre se termine dans
        </p>
        <div className="flex items-center justify-center gap-2 md:gap-3">
          {[
            { label: 'Jours', value: timeLeft.days },
            { label: 'Heures', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Secondes', value: timeLeft.seconds },
          ].map(({ label, value }, idx) => (
            <div key={label} className="flex items-center gap-2 md:gap-3">
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 rounded-lg min-w-[52px] md:min-w-[60px] py-2 px-2 text-center">
                  <span className="text-2xl md:text-3xl font-extrabold text-primary font-mono tabular-nums leading-none">
                    {pad(value)}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">{label}</span>
              </div>
              {idx < 3 && (
                <span className="text-primary font-bold text-xl mb-4 select-none">:</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
