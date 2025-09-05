import React from 'react';
import { Briefcase, Calendar, DollarSign, AlertTriangle } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { TextAreaField } from '../ui/TextAreaField';
import { SelectField } from '../ui/SelectField';

interface BusinessOperationsStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function BusinessOperationsStep({ data, onChange, errors }: BusinessOperationsStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Briefcase className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Operations</h2>
        <p className="text-gray-600">Tell us about your drive-away business operations</p>
      </div>

      <div className="space-y-6">
        <TextAreaField
          label="Business Description"
          id="businessDescription"
          value={data.businessDescription || ''}
          onChange={(value) => onChange('businessDescription', value)}
          error={errors.businessDescription}
          placeholder="Describe your drive-away operations, types of vehicles handled, routes covered, etc."
          helperText="Provide a detailed description of your drive-away services"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Years of Experience"
            id="yearsExperience"
            type="number"
            value={data.yearsExperience || ''}
            onChange={(value) => onChange('yearsExperience', value)}
            error={errors.yearsExperience}
            placeholder="5"
            icon={<Calendar className="w-5 h-5 text-gray-400" />}
            required
          />

          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="newVenture"
              checked={data.newVenture || false}
              onChange={(e) => onChange('newVenture', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="newVenture" className="text-sm font-medium text-gray-700">
              This is a new venture
            </label>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            id="primaryBusiness"
            checked={data.primaryBusiness || false}
            onChange={(e) => onChange('primaryBusiness', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="primaryBusiness" className="text-sm font-medium text-gray-700">
            This is your primary business
          </label>
        </div>

        {!data.primaryBusiness && (
          <TextAreaField
            label="Other Business Activities"
            id="otherBusiness"
            value={data.otherBusiness || ''}
            onChange={(value) => onChange('otherBusiness', value)}
            error={errors.otherBusiness}
            placeholder="Describe your other business activities"
          />
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
            <div className="space-y-4 flex-1">
              <h3 className="font-semibold text-gray-900">Financial Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Gross Receipts Last Year"
                  id="grossReceiptsLastYear"
                  value={data.grossReceiptsLastYear || ''}
                  onChange={(value) => onChange('grossReceiptsLastYear', value)}
                  error={errors.grossReceiptsLastYear}
                  placeholder="$250,000"
                  icon={<DollarSign className="w-5 h-5 text-gray-400" />}
                />
                
                <InputField
                  label="Estimated Receipts This Year"
                  id="estimatedReceipts"
                  value={data.estimatedReceipts || ''}
                  onChange={(value) => onChange('estimatedReceipts', value)}
                  error={errors.estimatedReceipts}
                  placeholder="$300,000"
                  icon={<DollarSign className="w-5 h-5 text-gray-400" />}
                />
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="businessForSale"
                  checked={data.businessForSale || false}
                  onChange={(e) => onChange('businessForSale', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="businessForSale" className="text-sm font-medium text-gray-700">
                  Business is currently for sale
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="bankruptcyHistory"
                  checked={data.bankruptcyHistory || false}
                  onChange={(e) => onChange('bankruptcyHistory', e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="bankruptcyHistory" className="text-sm font-medium text-gray-700">
                  Filed for bankruptcy in the past
                </label>
              </div>

              {data.bankruptcyHistory && (
                <div className="pl-6 space-y-3">
                  <InputField
                    label="When did you file for bankruptcy?"
                    id="bankruptcyDate"
                    value={data.bankruptcyDate || ''}
                    onChange={(value) => onChange('bankruptcyDate', value)}
                    error={errors.bankruptcyDate}
                    placeholder="MM/YYYY"
                  />
                  <TextAreaField
                    label="Explanation"
                    id="bankruptcyExplanation"
                    value={data.bankruptcyExplanation || ''}
                    onChange={(value) => onChange('bankruptcyExplanation', value)}
                    error={errors.bankruptcyExplanation}
                    placeholder="Please explain the circumstances"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="multipleStates"
              checked={data.multipleStates || false}
              onChange={(e) => onChange('multipleStates', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="multipleStates" className="text-sm font-medium text-gray-700">
              Operations in multiple states
            </label>
          </div>

          {data.multipleStates && (
            <TextAreaField
              label="List States of Operation"
              id="operationStates"
              value={data.operationStates || ''}
              onChange={(value) => onChange('operationStates', value)}
              error={errors.operationStates}
              placeholder="List all states where you operate"
            />
          )}

          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="regularRoute"
              checked={data.regularRoute || false}
              onChange={(e) => onChange('regularRoute', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="regularRoute" className="text-sm font-medium text-gray-700">
              Operate over a regular route
            </label>
          </div>

          {data.regularRoute && (
            <TextAreaField
              label="Towns/Cities Operated Between"
              id="routeTowns"
              value={data.routeTowns || ''}
              onChange={(value) => onChange('routeTowns', value)}
              error={errors.routeTowns}
              placeholder="List the towns/cities on your regular route"
            />
          )}
        </div>
      </div>
    </div>
  );
}