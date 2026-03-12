'use client';
import React, { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    return difference > 0 ? timeLeft : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <>
      <div className="text-white text-center">
        <div className="flex tracking-widest ">

          <div>
            <div className='font-montserrat_medium  text-[13px] sm:text-[14px] md:text-[14px] lg:text-[18px] xl:text-2xl 2xl:text-2xl'>{String(timeLeft.days).padStart(2, '0')}</div>
            <span className='text-[6px] sm:text-[6px] md:text-[9px] lg:text-[9px] xl:text-[9px] 2xl:text-[9px]'>DÍAS</span>
          </div>

          <div className='text-[13px] sm:text-[14px] md:text-[14px] lg:text-[18px] xl:text-2xl 2xl:text-2xl'>:
          </div>

          <div>
            <div className='font-montserrat_medium text-[13px] sm:text-[14px] md:text-[14px] lg:text-[18px] xl:text-2xl 2xl:text-2xl'>
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <span className='text-[6px] sm:text-[6px] md:text-[9px] lg:text-[9px] xl:text-[9px] 2xl:text-[9px]'>HORAS</span>
          </div>

          <div className='text-[13px] sm:text-[14px] md:text-[14px] lg:text-[18px] xl:text-2xl 2xl:text-2xl'>:
          </div>

          <div>
            <div className='font-montserrat_medium text-[13px] sm:text-[14px] md:text-[14px] lg:text-[18px] xl:text-2xl 2xl:text-2xl'>
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <span className='text-[6px] sm:text-[6px] md:text-[9px] lg:text-[9px] xl:text-[9px] 2xl:text-[9px]'>MIN.</span>
          </div>

          <div className='text-[13px] sm:text-[14px] md:text-[14px] lg:text-[18px] xl:text-2xl 2xl:text-2xl'> :
          </div>

          <div>
            <div className='font-montserrat_medium text-[13px] sm:text-[14px] md:text-[14px] lg:text-[18px] xl:text-2xl 2xl:text-2xl'>
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <span className='text-[6px] sm:text-[6px] md:text-[9px] lg:text-[9px] xl:text-[9px] 2xl:text-[9px]'>SEG.</span>
          </div>

        </div>
      </div>


    </>
  );
};

export default CountdownTimer;