import React from 'react';
import { FileText, Plus, Trash2 } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { TextAreaField } from '../ui/TextAreaField';

interface LossHistoryStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function LossHistoryStep({ data, onChange, errors }: LossHistoryStepProps) {
  const priorInsurance = data.priorInsurance || [];

  const addInsuranceRecord = () => {
    const newRecord = {
      id: Date.now(),
      carrierName: '',
      policyTerm: '',
      vehicles: '',
      accidents: '',
      premium: '',
      claimsPaid: ''
    };
    onChange('priorInsurance', [...priorInsurance, newRecord]);
  };

  const removeInsuranceRecord = (id: number) => {
    const updated = priorInsurance.filter((record: any) => record.id !== id);
    onChange('priorInsurance', updated);
  };

  const updateInsuranceRecord = (id: number, field: string, value: any) => {
    const updated = priorInsurance.map((record: any) =>
      record.id === id ? { ...record, [field]: value } : record
    );
    onChange('priorInsurance', updated);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
          <FileText className="w-8 h-8 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Insurance History</h2>
        <p className="text-gray-600">Help us understand your insurance background</p>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Columbia Insurance</h3>
          
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="checkbox"
              id="hadColumbiaInsurance"
              checked={data.hadColumbiaInsurance || false}
              onChange={(e) => onChange('hadColumbiaInsurance', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="hadColumbiaInsurance" className="text-sm font-medium text-gray-700">
              I have previously had insurance with Columbia Insurance Company
            </label>
          </div>

          {data.hadColumbiaInsurance && (
            <div className="pl-6 space-y-4">
              <InputField
                label="Previous Policy Number(s)"
                id="previousPolicyNumbers"
                value={data.previousPolicyNumbers || ''}
                onChange={(value) => onChange('previousPolicyNumbers', value)}
                error={errors.previousPolicyNumbers}
                placeholder="ABC123456789"
              />
              
              <InputField
                label="Effective Date(s)"
                id="previousEffectiveDates"
                value={data.previousEffectiveDates || ''}
                onChange={(value) => onChange('previousEffectiveDates', value)}
                error={errors.previousEffectiveDates}
                placeholder="01/01/2023 to 12/31/2023"
              />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Prior Insurance (Last 3 Years)</h3>
            <button
              type="button"
              onClick={addInsuranceRecord}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Insurance Record
            </button>
          </div>

          {priorInsurance.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No prior insurance records added</p>
              <button
                type="button"
                onClick={addInsuranceRecord}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Insurance Record
              </button>
            </div>
          )}

          {priorInsurance.map((record: any, index: number) => (
            <div key={record.id} className="bg-gray-50 rounded-lg p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Insurance Record #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeInsuranceRecord(record.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <InputField
                  label="Insurance Company Name"
                  id={`insurance-${record.id}-carrier`}
                  value={record.carrierName || ''}
                  onChange={(value) => updateInsuranceRecord(record.id, 'carrierName', value)}
                  error={errors[`insurance-${record.id}-carrier`]}
                  placeholder="Insurance carrier name"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField
                    label="Policy Term"
                    id={`insurance-${record.id}-term`}
                    value={record.policyTerm || ''}
                    onChange={(value) => updateInsuranceRecord(record.id, 'policyTerm', value)}
                    error={errors[`insurance-${record.id}-term`]}
                    placeholder="01/01/22 - 12/31/22"
                  />
                  
                  <InputField
                    label="Number of Vehicles"
                    id={`insurance-${record.id}-vehicles`}
                    type="number"
                    value={record.vehicles || ''}
                    onChange={(value) => updateInsuranceRecord(record.id, 'vehicles', value)}
                    error={errors[`insurance-${record.id}-vehicles`]}
                    placeholder="5"
                  />
                  
                  <InputField
                    label="Number of Accidents"
                    id={`insurance-${record.id}-accidents`}
                    type="number"
                    value={record.accidents || ''}
                    onChange={(value) => updateInsuranceRecord(record.id, 'accidents', value)}
                    error={errors[`insurance-${record.id}-accidents`]}
                    placeholder="0"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Total Premium"
                    id={`insurance-${record.id}-premium`}
                    value={record.premium || ''}
                    onChange={(value) => updateInsuranceRecord(record.id, 'premium', value)}
                    error={errors[`insurance-${record.id}-premium`]}
                    placeholder="$12,500"
                  />
                  
                  <InputField
                    label="Claims Paid & Reserves"
                    id={`insurance-${record.id}-claims`}
                    value={record.claimsPaid || ''}
                    onChange={(value) => updateInsuranceRecord(record.id, 'claimsPaid', value)}
                    error={errors[`insurance-${record.id}-claims`]}
                    placeholder="$5,000"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Disclosure Questions</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                id="awareOfClaims"
                checked={data.awareOfClaims || false}
                onChange={(e) => onChange('awareOfClaims', e.target.checked)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-1"
              />
              <label htmlFor="awareOfClaims" className="text-sm font-medium text-gray-700">
                Are you aware of any facts, incidents, or situations that could result in a claim?
              </label>
            </div>

            {data.awareOfClaims && (
              <div className="pl-6">
                <TextAreaField
                  label="Please provide complete details"
                  id="claimDetails"
                  value={data.claimDetails || ''}
                  onChange={(value) => onChange('claimDetails', value)}
                  error={errors.claimDetails}
                  placeholder="Describe the situation in detail"
                  required
                />
              </div>
            )}

            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                id="declinedInsurance"
                checked={data.declinedInsurance || false}
                onChange={(e) => onChange('declinedInsurance', e.target.checked)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-1"
              />
              <label htmlFor="declinedInsurance" className="text-sm font-medium text-gray-700">
                Have you ever been declined, cancelled, or non-renewed for this type of insurance?
              </label>
            </div>

            {data.declinedInsurance && (
              <div className="pl-6 space-y-3">
                <InputField
                  label="Date and Reason"
                  id="declinedReason"
                  value={data.declinedReason || ''}
                  onChange={(value) => onChange('declinedReason', value)}
                  error={errors.declinedReason}
                  placeholder="MM/YYYY - Reason for decline/cancellation"
                  required
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}