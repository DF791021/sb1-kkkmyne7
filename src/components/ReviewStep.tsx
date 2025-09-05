import React from 'react';
import { CheckCircle, User, Mail, Settings } from 'lucide-react';

interface ReviewStepProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    interests: string[];
    notifications: boolean;
    newsletter: boolean;
  };
}

export function ReviewStep({ data }: ReviewStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Information</h2>
        <p className="text-gray-600">Please confirm everything looks correct before submitting</p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">First Name</label>
              <p className="text-gray-900 font-medium">{data.firstName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Last Name</label>
              <p className="text-gray-900 font-medium">{data.lastName}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Mail className="w-4 h-4 text-gray-500 mr-2" />
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900 font-medium">{data.email}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Settings className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Interests</label>
              <div className="flex flex-wrap gap-2">
                {data.interests.map((interest) => (
                  <span 
                    key={interest}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {interest}
                  </span>
                ))}
                {data.interests.length === 0 && (
                  <span className="text-gray-500 italic">None selected</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">Push Notifications</span>
              <span className={`font-medium ${data.notifications ? 'text-green-600' : 'text-gray-500'}`}>
                {data.notifications ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">Newsletter</span>
              <span className={`font-medium ${data.newsletter ? 'text-green-600' : 'text-gray-500'}`}>
                {data.newsletter ? 'Subscribed' : 'Not subscribed'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}