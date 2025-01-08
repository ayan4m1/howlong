import {
  parseISO,
  intervalToDuration,
  interval,
  formatDuration,
  isAfter
} from 'date-fns';
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

import Flag from './flag';
import { Helmet } from 'react-helmet';

const inauguration = parseISO('2025-01-25T12:00:00-5');

const getRemainingTime = () => {
  const now = Date.now();

  if (isAfter(now, inauguration)) {
    return null;
  }

  const duration = intervalToDuration(interval(now, inauguration));

  return formatDuration(duration, {
    format: ['months', 'days', 'hours', 'minutes', 'seconds'],
    delimiter: ', ',
    zero: false
  });
};

export default function Countdown() {
  const [size, setSize] = useState(null);
  const [timeLeft, setTimeLeft] = useState(getRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime());
    }, 1000);

    const handleResize = () => {
      const width = Math.min(window.innerWidth, 600);

      setSize([width, width / (3 / 2)]);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main>
      <Helmet>
        <title>How Long Until We Are Fucked</title>
      </Helmet>
      <Canvas style={{ width: size?.[0], height: size?.[1] }}>
        <Flag />
      </Canvas>
      <h1 className="rainbow-word">
        We are all fucked{Boolean(timeLeft) && ' in'}
      </h1>
      {Boolean(timeLeft) && <h2>{timeLeft}</h2>}
    </main>
  );
}
