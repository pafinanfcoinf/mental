import React from 'react';
import { motion } from 'framer-motion';

export default function FormSection({ title, description, icon, children, index = 0, sectionNumber }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white rounded-2xl shadow-sm border border-violet-100 overflow-hidden"
    >
      {title && (
        <div className="px-6 py-4 border-b border-violet-50 bg-gradient-to-l from-violet-50 to-purple-50">
          <div className="flex flex-col items-center gap-2 text-center">
            {sectionNumber && (
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-white text-sm font-bold">{sectionNumber}</span>
              </div>
            )}
            <div>
              <h2 className="text-base font-semibold text-violet-900">{title}</h2>
              {description && (
                <p className="text-violet-400 text-sm mt-0.5">{description}</p>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="p-6 space-y-5">
        {children}
      </div>
    </motion.div>
  );
}