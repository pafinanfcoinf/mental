import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FormDropdown({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [], 
  required = false,
  placeholder = "اختر..."
}) {
  return (
    <div className="space-y-2">
      <Label className="text-violet-800 font-medium text-sm flex items-center gap-1">
        {label}
        {required && <span className="text-pink-500">*</span>}
      </Label>
      <Select
        value={value}
        onValueChange={(val) => onChange({ target: { name, value: val } })}
        required={required}
        dir="rtl"
      >
        <SelectTrigger className="w-full border-violet-200 focus:border-violet-400 focus:ring-violet-400/20 rounded-xl text-right bg-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent dir="rtl">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="focus:bg-violet-50">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}