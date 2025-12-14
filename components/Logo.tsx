import React from 'react';

export const Logo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" className="opacity-20" />
    <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.8" className="opacity-30" />
    <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1.2" className="opacity-40" />
    <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
    <circle cx="50" cy="50" r="8" fill="currentColor" className="opacity-80 animate-pulse" />
    {/* Abstract Wave */}
    <path d="M50 20C50 20 60 35 50 50C40 65 50 80 50 80" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="opacity-50" />
  </svg>
);

export const LogoIconDataURI = `data:image/svg+xml,<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="48" stroke="%23e7e5e4" stroke-width="2"/><circle cx="50" cy="50" r="28" stroke="%23e7e5e4" stroke-width="2"/><circle cx="50" cy="50" r="8" fill="%232dd4bf"/></svg>`;
