import React from 'react';
import { User, Mail } from 'lucide-react';

interface PersonalInfoStepProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export function PersonalInfoStep({ data, onChange, errors }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
        <p className="text-gray-600">We'll need some basic information to get started</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={data.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            className={`
              w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
              ${errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
            `}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600 animate-in fade-in duration-200">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={data.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            className={`
              w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
              ${errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
            `}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600 animate-in fade-in duration-200">{errors.lastName}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            Email Address
          </div>
        </label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          className={`
            w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
            ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
          `}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 animate-in fade-in duration-200">{errors.email}</p>
        )}
      </div>
    </div>
  );
}