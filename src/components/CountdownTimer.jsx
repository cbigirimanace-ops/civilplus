import { useState, useEffect } from 'react';

function pad(n) {
  return String(n).padStart(2, '0');
}

// Set a target date 72 hours from first load, stored in sessionStorage
function getTargetDate() {
  const stored = sessionStorage.getItem('civilplus_countdown');
  if (stored) {
    const date = new Date(stored);
    if (date > new Date()) return date;
  }
  const target = new Date(Date.now() + 72 * 60 * 60 * 1000);
  sessionStorage.setItem('civilplus_countdown', target.toISOString());
  return target;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [targetDate] = useState(getTargetDate);

  useEffect(() => {
    const calc = () => {
      const diff = targetDate - new Date();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-600">Offre expire dans :</span>
      <div className="flex items-center gap-1">
        {[
          { label: 'J', value: timeLeft.days },
          { label: 'H', value: timeLeft.hours },
          { label: 'M', value: timeLeft.minutes },
          { label: 'S', value: timeLeft.seconds },
        ].map(({ label, value }, idx) => (
          <div key={label} className="flex items-center gap-1">
            <div className="bg-primary text-white rounded text-center min-w-[40px] py-1 px-2">
              <span className="text-lg font-bold font-mono">{pad(value)}</span>
              <div className="text-xs opacity-70">{label}</div>
            </div>
            {idx < 3 && <span className="text-primary font-bold text-xl">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
