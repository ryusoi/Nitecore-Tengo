
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Watchdog } from './watchdog';

// Initialize Global Watchdog
try {
    Watchdog.init();
    Watchdog.log('App initialization started');
} catch (e) {
    console.error("Watchdog init failed", e);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
