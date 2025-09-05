import React from 'react';
import { Hash, Truck, CreditCard } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { SelectField } from '../ui/SelectField';
import { TextAreaField } from '../ui/TextAreaField';

interface PlateInformationStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function PlateInformationStep({ data, onChange, errors }: PlateInformationStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
          <Hash className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Plate Information</h2>
        <p className="text-gray-600">Details about vehicle plates used in your operations</p>
      </div>

      <div className="space-y-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
            Plate Requirements
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="requiredToUsePlates"
                checked={data.requiredToUsePlates || false}
                onChange={(e) => onChange('requiredToUsePlates', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="requiredToUsePlates" className="text-sm font-medium text-gray-700">
                Are you required to use plates?
              </label>
            </div>

            {data.requiredToUsePlates && (
              <div className="pl-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    id="useOwnPlatesExclusively"
                    checked={data.useOwnPlatesExclusively || false}
                    onChange={(e) => onChange('useOwnPlatesExclusively', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="useOwnPlatesExclusively" className="text-sm font-medium text-gray-700">
                    Do you use your own plates exclusively?
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Total Number of Plates"
                    id="totalNumberOfPlates"
                    type="number"
                    value={data.totalNumberOfPlates || ''}
                    onChange={(value) => onChange('totalNumberOfPlates', value)}
                    error={errors.totalNumberOfPlates}
                    placeholder="50"
                    required
                  />

                  <SelectField
                    label="Type of Plates Used"
                    id="plateType"
                    value={data.plateType || ''}
                    onChange={(value) => onChange('plateType', value)}
                    error={errors.plateType}
                    required
                    options={[
                      { value: '', label: 'Select plate type' },
                      { value: 'transporter', label: 'Transporter' },
                      { value: 'irp', label: 'IRP (International Registration Plan)' },
                      { value: 'other', label: 'Other' }
                    ]}
                  />
                </div>

                {data.plateType === 'other' && (
                  <InputField
                    label="Specify Other Plate Type"
                    id="otherPlateType"
                    value={data.otherPlateType || ''}
                    onChange={(value) => onChange('otherPlateType', value)}
                    error={errors.otherPlateType}
                    placeholder="Specify the type of plates used"
                    required
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {data.requiredToUsePlates && (
          <>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Truck className="w-5 h-5 text-green-600 mr-2" />
                Plate Usage & Management
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Plates Required Per Unit"
                    id="platesPerUnit"
                    type="number"
                    value={data.platesPerUnit || ''}
                    onChange={(value) => onChange('platesPerUnit', value)}
                    error={errors.platesPerUnit}
                    placeholder="1"
                    helperText="How many plates are attached to each drive-away unit?"
                  />
                  
                  <InputField
                    label="Average Plates in Use"
                    id="averagePlatesInUse"
                    type="number"
                    value={data.averagePlatesInUse || ''}
                    onChange={(value) => onChange('averagePlatesInUse', value)}
                    error={errors.averagePlatesInUse}
                    placeholder="25"
                    helperText="Average number attached to vehicles at any given time"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextAreaField
                    label="How are plates returned to you?"
                    id="plateReturnMethod"
                    value={data.plateReturnMethod || ''}
                    onChange={(value) => onChange('plateReturnMethod', value)}
                    error={errors.plateReturnMethod}
                    placeholder="Mail, courier service, driver pickup, etc."
                    rows={3}
                  />
                  
                  <InputField
                    label="Average Days Before Plates Returned"
                    id="plateReturnDays"
                    type="number"
                    value={data.plateReturnDays || ''}
                    onChange={(value) => onChange('plateReturnDays', value)}
                    error={errors.plateReturnDays}
                    placeholder="7"
                    helperText="Average turnaround time in days"
                  />
                </div>

                <TextAreaField
                  label="List Identification Numbers for Each Plate"
                  id="plateIdentificationNumbers"
                  value={data.plateIdentificationNumbers || ''}
                  onChange={(value) => onChange('plateIdentificationNumbers', value)}
                  error={errors.plateIdentificationNumbers}
                  placeholder="List all plate numbers (e.g., ABC123, DEF456, GHI789...)"
                  rows={4}
                  helperText="List each plate number separated by commas or line breaks"
                />
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Plate Coverage & Operators</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    id="allPlatesInsured"
                    checked={data.allPlatesInsured || false}
                    onChange={(e) => onChange('allPlatesInsured', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="allPlatesInsured" className="text-sm font-medium text-gray-700">
                    Are all plates owned to be insured under this policy?
                  </label>
                </div>

                {!data.allPlatesInsured && (
                  <div className="pl-6 space-y-4">
                    <TextAreaField
                      label="Explain which plates are not covered"
                      id="plateExclusions"
                      value={data.plateExclusions || ''}
                      onChange={(value) => onChange('plateExclusions', value)}
                      error={errors.plateExclusions}
                      placeholder="Explain which plates will not be covered by this policy"
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Number of Operators Used"
                        id="numberOfOperators"
                        type="number"
                        value={data.numberOfOperators || ''}
                        onChange={(value) => onChange('numberOfOperators', value)}
                        error={errors.numberOfOperators}
                        placeholder="5"
                        helperText="Number of operators using non-covered plates"
                      />

                      <div className="flex items-center space-x-4 mt-8">
                        <input
                          type="checkbox"
                          id="operatorsHaveContracts"
                          checked={data.operatorsHaveContracts || false}
                          onChange={(e) => onChange('operatorsHaveContracts', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="operatorsHaveContracts" className="text-sm font-medium text-gray-700">
                          Do operators have written contracts with you?
                        </label>
                      </div>
                    </div>

                    {data.operatorsHaveContracts && (
                      <div className="bg-blue-100 border border-blue-200 rounded p-4">
                        <p className="text-sm text-blue-800 font-medium">
                          📎 Please attach a copy of your operator contract
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          This can be provided after application submission
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}