import React from 'react';

export default function FormFooter() {
  return (
    <footer className="mt-10 py-8">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-0.5 bg-violet-200 rounded-full" />
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692b12ae3d77afdbc3ac222d/d0a0203d4_WhatsApp_Image_2025-10-19_at_32236_PM-removebg-preview.png"
          alt="ABA Target Logo"
          className="h-14 object-contain"
        />
        <p className="text-violet-400 text-xs">
          © {new Date().getFullYear()} ABA Target
        </p>
      </div>
    </footer>
  );
}