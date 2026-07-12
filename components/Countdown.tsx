// components/Countdown.tsx
"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string; // format: "2026-12-13T08:00:00"
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 inline-block shadow-sm">
      <div className="grid grid-cols-4 gap-6 text-center">
        <div>
          <div className="text-4xl font-light text-gray-800">
            {timeLeft.days}
          </div>
          <div className="text-sm uppercase tracking-widest text-gray-600">
            Days
          </div>
        </div>
        <div>
          <div className="text-4xl font-light text-gray-800">
            {timeLeft.hours}
          </div>
          <div className="text-sm uppercase tracking-widest text-gray-600">
            Hours
          </div>
        </div>
        <div>
          <div className="text-4xl font-light text-gray-800">
            {timeLeft.minutes}
          </div>
          <div className="text-sm uppercase tracking-widest text-gray-600">
            Mins
          </div>
        </div>
        <div>
          <div className="text-4xl font-light text-gray-800">
            {timeLeft.seconds}
          </div>
          <div className="text-sm uppercase tracking-widest text-gray-600">
            Secs
          </div>
        </div>
      </div>
    </div>
  );
}
