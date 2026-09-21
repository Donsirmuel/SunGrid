// Safeguard against "Cannot set property fetch of #<Window> which has only a getter"
(function initFetchProtection() {
  try {
    if (typeof window !== 'undefined' && window.fetch) {
      const orig = window.fetch.bind(window);
      let curr = orig;
      try {
        Object.defineProperty(window, 'fetch', {
          get: () => curr,
          set: (fn) => { curr = typeof fn === 'function' ? fn : orig; },
          configurable: true,
          enumerable: true
        });
      } catch (_) {}
      if (window.Window && window.Window.prototype) {
        try {
          Object.defineProperty(window.Window.prototype, 'fetch', {
            get: () => curr,
            set: (fn) => { curr = typeof fn === 'function' ? fn : orig; },
            configurable: true,
            enumerable: true
          });
        } catch (_) {}
      }
    }
  } catch (_) {}
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
