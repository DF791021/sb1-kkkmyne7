import React from 'react';

interface TextAreaFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export function TextAreaField({
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
  helperText,
  required,
  disabled,
  rows = 4
}: TextAreaFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={rows}
        className={`
          w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical
          ${error 
            ? 'border-red-300 bg-red-50 focus:ring-red-500' 
            : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 animate-in fade-in duration-200">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}