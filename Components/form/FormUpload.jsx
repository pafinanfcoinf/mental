import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText, Image, Loader2, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function FormFileUpload({ 
  label, 
  name, 
  value, 
  onChange, 
  required = false,
  accept = ".pdf,.png,.jpg,.jpeg"
}) {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setFileName(file.name);

    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      onChange({ target: { name, value: file_url } });
    } catch (error) {
      console.error('Upload failed:', error);
      setFileName('');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange({ target: { name, value: '' } });
    setFileName('');
  };

  const getFileIcon = () => {
    if (fileName.toLowerCase().endsWith('.pdf')) {
      return <FileText className="w-5 h-5 text-violet-600" />;
    }
    return <Image className="w-5 h-5 text-violet-600" />;
  };

  return (
    <div className="space-y-2">
      <Label className="text-violet-800 font-medium text-sm flex items-center gap-1">
        {label}
        {required && <span className="text-pink-500">*</span>}
      </Label>
      
      {!value ? (
        <div className="relative">
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            required={required}
          />
          <div className="border-2 border-dashed border-violet-200 rounded-xl p-6 text-center hover:border-violet-400 hover:bg-violet-50/50 transition-all duration-200">
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
                <p className="text-sm text-violet-500">جاري رفع الملف...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                  <Upload className="w-6 h-6 text-violet-500" />
                </div>
                <p className="text-sm text-violet-600">اضغط لرفع الملف أو اسحبه هنا</p>
                <p className="text-xs text-violet-400">PDF أو صورة (PNG, JPG)</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-violet-50 border border-violet-200 rounded-xl">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-violet-700 truncate max-w-[200px]">
              {fileName || 'تم رفع الملف'}
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-violet-400 hover:text-red-600 hover:bg-red-50"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}