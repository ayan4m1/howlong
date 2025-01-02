import {
  parseISO,
  intervalToDuration,
  interval,
  formatDuration,
  isAfter
} from 'date-fns';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';

import Flag from './flag';
import { Helmet } from 'react-helmet';

const inauguration = parseISO('2025-01-25T10:00:00-5');

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
  const [timeLeft, setTimeLeft] = useState(getRemainingTime());

  setInterval(() => {
    setTimeLeft(getRemainingTime());
  }, 1000);

  return (
    <main>
      <Helmet>
        <title>How Long Until We Are Fucked</title>
      </Helmet>
      <Canvas style={{ width: 600, height: 400 }}>
        <Flag />
      </Canvas>
      <h1 className="rainbow-word">
        We are all fucked{Boolean(timeLeft) && ' in'}
      </h1>
      {Boolean(timeLeft) && <h2>{timeLeft}</h2>}
    </main>
  );
}
