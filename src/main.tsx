import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// GitHub Pages SPA redirect: read ?/ query and restore the path.
(function () {
  const l = window.location;
  if (l.search.startsWith('?/')) {
    const decoded = l.search
      .slice(2)
      .split('&')
      .map((s) => s.replace(/~and~/g, '&'))
      .join('?');
    window.history.replaceState(null, '', l.pathname.slice(0, -1) + decoded + l.hash);
  }
})();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/majira-marefu">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
