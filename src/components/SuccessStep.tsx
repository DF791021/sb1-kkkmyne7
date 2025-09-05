import React from 'react';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export function SuccessStep() {
  return (
    <div className="text-center space-y-8">
      <div className="relative">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 relative">
          <CheckCircle2 className="w-12 h-12 text-green-600 animate-in zoom-in duration-500" />
          <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-2 -right-2 animate-bounce" />
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome aboard! 🎉</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Your information has been successfully submitted. We're excited to have you join our community!
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">What's next?</h3>
        <ul className="space-y-2 text-left text-gray-600">
          <li className="flex items-center">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
            You'll receive a welcome email within 5 minutes
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
            Your account is being set up in the background
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
            We'll notify you when everything is ready
          </li>
        </ul>
      </div>
      
      <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
        Continue to Dashboard
        <ArrowRight className="ml-2 w-4 h-4" />
      </button>
    </div>
  );
}