import React from 'react';
import { Settings, Bell, Globe } from 'lucide-react';

interface PreferencesStepProps {
  data: {
    interests: string[];
    notifications: boolean;
    newsletter: boolean;
    language: string;
  };
  onChange: (field: string, value: any) => void;
}

export function PreferencesStep({ data, onChange }: PreferencesStepProps) {
  const interests = [
    'Technology', 'Design', 'Business', 'Marketing', 
    'Development', 'AI & ML', 'Startups', 'Finance'
  ];
  
  const toggleInterest = (interest: string) => {
    const newInterests = data.interests.includes(interest)
      ? data.interests.filter(i => i !== interest)
      : [...data.interests, interest];
    onChange('interests', newInterests);
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Settings className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Preferences</h2>
        <p className="text-gray-600">Help us customize your experience</p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What interests you?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {interests.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`
                px-4 py-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium
                ${data.interests.includes(interest)
                  ? 'border-blue-500 bg-blue-50 text-blue-700 scale-105'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Communication Preferences</h3>
        
        <div className="space-y-4">
          <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
            <input
              type="checkbox"
              checked={data.notifications}
              onChange={(e) => onChange('notifications', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <Bell className="w-4 h-4 text-gray-600 mr-2" />
                <span className="font-medium text-gray-900">Push Notifications</span>
              </div>
              <p className="text-sm text-gray-600">Get notified about updates and important information</p>
            </div>
          </label>
          
          <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
            <input
              type="checkbox"
              checked={data.newsletter}
              onChange={(e) => onChange('newsletter', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <Globe className="w-4 h-4 text-gray-600 mr-2" />
                <span className="font-medium text-gray-900">Newsletter</span>
              </div>
              <p className="text-sm text-gray-600">Receive weekly insights and industry updates</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}