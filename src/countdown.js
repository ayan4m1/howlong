import {
  parseISO,
  intervalToDuration,
  interval,
  formatDuration
} from 'date-fns';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';

import Flag from './flag';

const inauguration = parseISO('2025-01-25T10:00:00-5');

const getRemainingTime = () => {
  const now = Date.now();
  const duration = intervalToDuration(interval(now, inauguration));

  return formatDuration(duration, {
    format: ['months', 'days', 'hours', 'minutes', 'seconds'],
    delimiter: ', ',
    zero: false
  });
};

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getRemainingTime());

  setInterval(() => {
    setTimeLeft(getRemainingTime());
  }, 1000);

  return (
    <main>
      <Canvas style={{ width: 600, height: 400 }}>
        <Flag />
      </Canvas>
      <h1 className="rainbow-word">We are all fucked in</h1>
      <h2>{timeLeft}</h2>
    </main>
  );
}
