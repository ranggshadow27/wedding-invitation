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

  // Helper untuk padding angka satuan (misal: 9 jadi 09) agar lebar card tidak goyang
  const formatNumber = (num: number) => String(num).padStart(2, "0");

  const timeData = [
    { label: "days", value: timeLeft.days },
    { label: "hours", value: timeLeft.hours },
    { label: "mins", value: timeLeft.minutes },
    { label: "secs", value: timeLeft.seconds },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 font-['Montserrat Alternates']">
      <div className="grid grid-cols-4 gap-2 text-center">
        {timeData.map((item, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-md rounded-3xl sm:rounded-4xl p-2 sm:p-5 md:p-6 shadow-2xl flex flex-col justify-center items-center aspect-square sm:aspect-auto"
          >
            <div className="text-xl sm:text-3xl md:text-3xl font-bold text-gray-600">
              {formatNumber(item.value)}
            </div>
            <div className="text-[10px] sm:text-sm font-medium text-gray-600/50 tracking-wider">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
