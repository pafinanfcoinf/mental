import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FormRadio({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [], 
  required = false 
}) {
  return (
    <div className="space-y-3">
      <Label className="text-violet-800 font-medium text-sm flex items-center gap-1">
        {label}
        {required && <span className="text-pink-500">*</span>}
      </Label>
      <RadioGroup
        value={value}
        onValueChange={(val) => onChange({ target: { name, value: val } })}
        className="space-y-2"
        dir="rtl"
      >
        {options.map((option) => (
          <div
            key={option.value}
            className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
              value === option.value 
                ? 'border-violet-400 bg-violet-50' 
                : 'border-violet-100 hover:border-violet-300 hover:bg-violet-50/50'
            }`}
          >
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
              className="border-violet-300 text-violet-600 data-[state=checked]:border-violet-500"
            />
            <Label
              htmlFor={`${name}-${option.value}`}
              className="flex-1 cursor-pointer text-violet-700 text-sm"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}