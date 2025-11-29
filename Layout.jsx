import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen" dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Tajawal', sans-serif;
        }
        
        :root {
          --font-sans: 'Tajawal', sans-serif;
        }
        
        body {
          font-family: 'Tajawal', sans-serif;
        }
      `}</style>
      {children}
    </div>
  );
}