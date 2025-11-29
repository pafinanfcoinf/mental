import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function FormInput({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text", 
  required = false,
  placeholder = "",
  multiline = false,
  rows = 4
}) {
  return (
    <div className="space-y-2">
      <Label className="text-violet-800 font-medium text-sm flex items-center gap-1">
        {label}
        {required && <span className="text-pink-500">*</span>}
      </Label>
      {multiline ? (
        <Textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className="w-full resize-none border-violet-200 focus:border-violet-400 focus:ring-violet-400/20 rounded-xl transition-all duration-200 text-right bg-white placeholder:text-violet-300"
          dir="rtl"
        />
      ) : (
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full border-violet-200 focus:border-violet-400 focus:ring-violet-400/20 rounded-xl transition-all duration-200 text-right bg-white placeholder:text-violet-300"
          dir="rtl"
        />
      )}
    </div>
  );
}