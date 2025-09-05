import React from 'react';
import { CheckCircle2, Sparkles, ArrowRight, FileText, Clock, Mail } from 'lucide-react';

interface SuccessStepProps {
  applicationNumber?: string;
  onStartNew: () => void;
}

export function SuccessStep({ applicationNumber, onStartNew }: SuccessStepProps) {
  const displayNumber = applicationNumber || `DA-${Date.now().toString().slice(-8)}`;
  
  return (
    <div className="text-center space-y-8">
      <div className="relative">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 relative">
          <CheckCircle2 className="w-12 h-12 text-green-600 animate-in zoom-in duration-500" />
          <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-2 -right-2 animate-bounce" />
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted! 🎉</h2>
        <p className="text-lg text-gray-600 mb-2">
          Thank you for choosing Columbia Insurance Company
        </p>
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
          <FileText className="w-4 h-4 text-blue-600 mr-2" />
          <span className="text-sm font-medium text-blue-600">
            Application #{displayNumber}
          </span>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
        <div className="space-y-4 text-left">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-semibold text-blue-600">1</span>
            </div>
            <div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gray-600 mr-2" />
                <span className="font-medium text-gray-900">Confirmation Email Sent</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                A confirmation email with application details has been sent to your business email
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-semibold text-blue-600">2</span>
            </div>
            <div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-600 mr-2" />
                <span className="font-medium text-gray-900">Underwriting Review</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Our team will review your application within 2 business days
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-semibold text-blue-600">3</span>
            </div>
            <div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-gray-600 mr-2" />
                <span className="font-medium text-gray-900">Policy Issuance</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Once approved, your policy documents will be sent via email
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
        <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <p>📞 Call us: 1-800-COLUMBIA</p>
          <p>📧 Email: underwriting@columbia.com</p>
          <p>📋 Reference: {displayNumber}</p>
          <p>🕐 Hours: Mon-Fri 8AM-6PM EST</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onStartNew}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Start New Application
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
        
        <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
          Download PDF Copy
          <FileText className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}