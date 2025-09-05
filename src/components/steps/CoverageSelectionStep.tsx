import React from 'react';
import { Shield, DollarSign } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { SelectField } from '../ui/SelectField';

interface CoverageSelectionStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function CoverageSelectionStep({ data, onChange, errors }: CoverageSelectionStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Shield className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Coverage Selection</h2>
        <p className="text-gray-600">Choose the insurance coverage that best fits your needs</p>
      </div>

      <div className="space-y-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 text-blue-600 mr-2" />
            Liability Coverage
          </h3>
          
          <div className="space-y-4">
            <SelectField
              label="Liability Coverage Type"
              id="liabilityCoverageType"
              value={data.liabilityCoverageType || ''}
              onChange={(value) => onChange('liabilityCoverageType', value)}
              error={errors.liabilityCoverageType}
              required
              options={[
                { value: '', label: 'Select coverage type' },
                { value: 'combined', label: 'Combined Single Limit' },
                { value: 'split', label: 'Split Limits' }
              ]}
              helperText="Combined limits are typically simpler to manage"
            />

            {data.liabilityCoverageType === 'combined' && (
              <SelectField
                label="Combined Single Limit"
                id="combinedLimit"
                value={data.combinedLimit || ''}
                onChange={(value) => onChange('combinedLimit', value)}
                error={errors.combinedLimit}
                required
                options={[
                  { value: '', label: 'Select limit' },
                  { value: '300000', label: '$300,000' },
                  { value: '500000', label: '$500,000' },
                  { value: '1000000', label: '$1,000,000' },
                  { value: '2000000', label: '$2,000,000' }
                ]}
              />
            )}

            {data.liabilityCoverageType === 'split' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SelectField
                  label="Bodily Injury Per Person"
                  id="bodilyInjuryPerPerson"
                  value={data.bodilyInjuryPerPerson || ''}
                  onChange={(value) => onChange('bodilyInjuryPerPerson', value)}
                  error={errors.bodilyInjuryPerPerson}
                  required
                  options={[
                    { value: '', label: 'Select' },
                    { value: '100000', label: '$100,000' },
                    { value: '250000', label: '$250,000' },
                    { value: '500000', label: '$500,000' }
                  ]}
                />
                <SelectField
                  label="Bodily Injury Per Accident"
                  id="bodilyInjuryPerAccident"
                  value={data.bodilyInjuryPerAccident || ''}
                  onChange={(value) => onChange('bodilyInjuryPerAccident', value)}
                  error={errors.bodilyInjuryPerAccident}
                  required
                  options={[
                    { value: '', label: 'Select' },
                    { value: '300000', label: '$300,000' },
                    { value: '500000', label: '$500,000' },
                    { value: '1000000', label: '$1,000,000' }
                  ]}
                />
                <SelectField
                  label="Property Damage"
                  id="propertyDamage"
                  value={data.propertyDamage || ''}
                  onChange={(value) => onChange('propertyDamage', value)}
                  error={errors.propertyDamage}
                  required
                  options={[
                    { value: '', label: 'Select' },
                    { value: '50000', label: '$50,000' },
                    { value: '100000', label: '$100,000' },
                    { value: '300000', label: '$300,000' }
                  ]}
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 text-green-600 mr-2" />
            Additional Coverage Options
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Medical Payments"
                id="medicalPayments"
                value={data.medicalPayments || ''}
                onChange={(value) => onChange('medicalPayments', value)}
                error={errors.medicalPayments}
                options={[
                  { value: '', label: 'No coverage' },
                  { value: '5000', label: '$5,000' },
                  { value: '10000', label: '$10,000' },
                  { value: '25000', label: '$25,000' }
                ]}
                helperText="Covers medical expenses regardless of fault"
              />

              <SelectField
                label="Personal Injury Protection"
                id="personalInjuryProtection"
                value={data.personalInjuryProtection || ''}
                onChange={(value) => onChange('personalInjuryProtection', value)}
                error={errors.personalInjuryProtection}
                options={[
                  { value: '', label: 'No coverage' },
                  { value: '10000', label: '$10,000' },
                  { value: '25000', label: '$25,000' },
                  { value: '50000', label: '$50,000' }
                ]}
                helperText="Available in select states"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="uninsuredMotorist"
                  checked={data.uninsuredMotorist || false}
                  onChange={(e) => onChange('uninsuredMotorist', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="uninsuredMotorist" className="text-sm font-medium text-gray-700">
                  Uninsured Motorist Coverage
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="underinsuredMotorist"
                  checked={data.underinsuredMotorist || false}
                  onChange={(e) => onChange('underinsuredMotorist', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="underinsuredMotorist" className="text-sm font-medium text-gray-700">
                  Underinsured Motorist Coverage
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Damage Coverage</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="physicalDamageDesired"
                checked={data.physicalDamageDesired || false}
                onChange={(e) => onChange('physicalDamageDesired', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="physicalDamageDesired" className="text-sm font-medium text-gray-700">
                I want physical damage coverage for the vehicles I drive away
              </label>
            </div>

            {data.physicalDamageDesired && (
              <div className="pl-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Average Vehicle Value"
                    id="averageVehicleValue"
                    value={data.averageVehicleValue || ''}
                    onChange={(value) => onChange('averageVehicleValue', value)}
                    error={errors.averageVehicleValue}
                    placeholder="$35,000"
                    icon={<DollarSign className="w-5 h-5 text-gray-400" />}
                    helperText="Average value per unit"
                  />
                  
                  <InputField
                    label="Maximum Vehicle Value"
                    id="maximumVehicleValue"
                    value={data.maximumVehicleValue || ''}
                    onChange={(value) => onChange('maximumVehicleValue', value)}
                    error={errors.maximumVehicleValue}
                    placeholder="$75,000"
                    icon={<DollarSign className="w-5 h-5 text-gray-400" />}
                    helperText="Maximum value per unit"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectField
                    label="Comprehensive Deductible"
                    id="comprehensiveDeductible"
                    value={data.comprehensiveDeductible || ''}
                    onChange={(value) => onChange('comprehensiveDeductible', value)}
                    error={errors.comprehensiveDeductible}
                    options={[
                      { value: '', label: 'Select deductible' },
                      { value: '250', label: '$250' },
                      { value: '500', label: '$500' },
                      { value: '1000', label: '$1,000' },
                      { value: '2500', label: '$2,500' }
                    ]}
                  />
                  
                  <SelectField
                    label="Collision Deductible"
                    id="collisionDeductible"
                    value={data.collisionDeductible || ''}
                    onChange={(value) => onChange('collisionDeductible', value)}
                    error={errors.collisionDeductible}
                    options={[
                      { value: '', label: 'Select deductible' },
                      { value: '250', label: '$250' },
                      { value: '500', label: '$500' },
                      { value: '1000', label: '$1,000' },
                      { value: '2500', label: '$2,500' }
                    ]}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}