
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Analytics } from "@vercel/analytics/react";
import App from './App';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <Analytics/>
    <App />
  </StrictMode>
);
