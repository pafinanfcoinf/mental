import React from 'react';
import { motion } from 'framer-motion';

export default function FormHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-sm border border-violet-100 overflow-hidden"
    >
      {/* Purple accent bar */}
      <div className="h-2 bg-gradient-to-l from-violet-500 to-purple-500" />
      
      <div className="p-8 md:p-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692b12ae3d77afdbc3ac222d/d0a0203d4_WhatsApp_Image_2025-10-19_at_32236_PM-removebg-preview.png"
            alt="ABA Target Logo"
            className="h-32 md:h-40 object-contain"
          />
        </div>
        
        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold text-violet-900 text-center leading-relaxed mb-1">
          التقديم لمنحة الإشراف المجاني لشهادة ABAT
        </h1>
        <p className="text-violet-400 text-center text-sm mb-6">دفعة ديسمبر</p>
        
        {/* Divider */}
        <div className="w-16 h-0.5 bg-violet-200 mx-auto mb-6" />
        
        {/* Description */}
        <div className="bg-violet-50/50 rounded-xl p-5 text-gray-600 text-sm leading-loose border border-violet-100">
          <p className="mb-4">
            تهدف هذه المنحة إلى دعم <strong className="text-violet-700">3 متقدمين جادّين</strong> لبدء رحلتهم المهنية نحو شهادة
            <strong className="text-violet-700"> Assistant Behavior Analyst Technician – ABAT </strong>
            من خلال إشراف مجاني لمدة <strong className="text-violet-700">4 أسابيع</strong> مع 
            <strong className="text-violet-700"> Farida Mohammed </strong>
            بعد نجاح محاضرتها على منصة ABC of Behavior.
          </p>
          <p className="text-violet-500 border-t border-violet-100 pt-4">
            يتم اختيار المقبولين وفق الجدية، الدافعية، والاستعداد للالتزام.
          </p>
        </div>
      </div>
    </motion.div>
  );
}