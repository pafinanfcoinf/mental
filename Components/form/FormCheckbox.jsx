import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function FormCheckbox({ 
  label, 
  name, 
  checked, 
  onChange, 
  required = false 
}) {
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 ${
      checked 
        ? 'border-violet-400 bg-violet-50' 
        : 'border-violet-100 hover:border-violet-300 hover:bg-violet-50/50'
    }`}>
      <Checkbox
        id={name}
        checked={checked}
        onCheckedChange={(val) => onChange({ target: { name, checked: val } })}
        required={required}
        className="mt-0.5 border-violet-300 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
      />
      <Label
        htmlFor={name}
        className="flex-1 cursor-pointer text-violet-700 text-sm leading-relaxed"
      >
        {label}
        {required && <span className="text-pink-500 mr-1">*</span>}
      </Label>
    </div>
  );
}