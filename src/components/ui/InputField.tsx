import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'date';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}

export function InputField({
  label,
  id,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  icon,
  helperText,
  required,
  disabled
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`
            w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
            ${icon ? 'pl-12' : 'pl-4'}
            ${error 
              ? 'border-red-300 bg-red-50 focus:ring-red-500' 
              : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
            }
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          `}
          placeholder={placeholder}
        />
      </div>
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