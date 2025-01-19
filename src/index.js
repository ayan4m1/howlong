import { createRoot } from 'react-dom/client';

import './index.scss';
import Countdown from './countdown.js';

const root = createRoot(document.getElementById('root'));

root.render(<Countdown />);
