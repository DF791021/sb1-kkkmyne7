import React from 'react';
import { Truck, Shield, FileCheck, Users } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { SelectField } from '../ui/SelectField';
import { TextAreaField } from '../ui/TextAreaField';

interface AdditionalOperationsStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function AdditionalOperationsStep({ data, onChange, errors }: AdditionalOperationsStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <Truck className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Operations</h2>
        <p className="text-gray-600">Detailed operational requirements and procedures</p>
      </div>

      <div className="space-y-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 text-blue-600 mr-2" />
            Driver Management & Safety
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Driver's Maximum Driving Hours - Daily"
                id="maxDailyDrivingHours"
                type="number"
                value={data.maxDailyDrivingHours || ''}
                onChange={(value) => onChange('maxDailyDrivingHours', value)}
                error={errors.maxDailyDrivingHours}
                placeholder="10"
                helperText="Maximum hours per day a driver can operate"
              />
              
              <InputField
                label="Driver's Maximum Driving Hours - Weekly"
                id="maxWeeklyDrivingHours"
                type="number"
                value={data.maxWeeklyDrivingHours || ''}
                onChange={(value) => onChange('maxWeeklyDrivingHours', value)}
                error={errors.maxWeeklyDrivingHours}
                placeholder="60"
                helperText="Maximum hours per week a driver can operate"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="driversAllowedHome"
                  checked={data.driversAllowedHome || false}
                  onChange={(e) => onChange('driversAllowedHome', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="driversAllowedHome" className="text-sm font-medium text-gray-700">
                  Are drivers ever allowed to take vehicles home at night?
                </label>
              </div>

              {data.driversAllowedHome && (
                <div className="pl-6">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id="familyMembersDrive"
                      checked={data.familyMembersDrive || false}
                      onChange={(e) => onChange('familyMembersDrive', e.target.checked)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <label htmlFor="familyMembersDrive" className="text-sm font-medium text-gray-700">
                      Will family members drive the vehicles?
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            Insurance Filings & Requirements
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="requireInsuranceFilings"
                checked={data.requireInsuranceFilings || false}
                onChange={(e) => onChange('requireInsuranceFilings', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="requireInsuranceFilings" className="text-sm font-medium text-gray-700">
                Do you require insurance filings?
              </label>
            </div>

            {data.requireInsuranceFilings && (
              <div className="pl-6 space-y-4">
                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="filingType"
                      value="state"
                      checked={data.filingType === 'state'}
                      onChange={(e) => onChange('filingType', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">State</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="filingType"
                      value="fhwa"
                      checked={data.filingType === 'fhwa'}
                      onChange={(e) => onChange('filingType', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">FHWA</span>
                  </label>
                </div>

                {data.filingType === 'fhwa' && (
                  <InputField
                    label="MC Number"
                    id="mcNumber"
                    value={data.mcNumber || ''}
                    onChange={(value) => onChange('mcNumber', value)}
                    error={errors.mcNumber}
                    placeholder="MC-123456"
                    helperText="Your FHWA MC number"
                    required
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileCheck className="w-5 h-5 text-purple-600 mr-2" />
            Towing & Return Operations
          </h3>
          
          <div className="space-y-4">
            <TextAreaField
              label="How is return trip handled?"
              id="returnTripDetails"
              value={data.returnTripDetails || ''}
              onChange={(value) => onChange('returnTripDetails', value)}
              error={errors.returnTripDetails}
              placeholder="Describe how drivers return after delivering vehicles"
              helperText="Commercial flights, shuttle services, company vehicles, etc."
            />

            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="deliveryWithTowing"
                  checked={data.deliveryWithTowing || false}
                  onChange={(e) => onChange('deliveryWithTowing', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="deliveryWithTowing" className="text-sm font-medium text-gray-700">
                  Is delivery made with one unit towing another unit?
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="driversOwnVehicles"
                  checked={data.driversOwnVehicles || false}
                  onChange={(e) => onChange('driversOwnVehicles', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="driversOwnVehicles" className="text-sm font-medium text-gray-700">
                  Do you permit drivers to tow their own vehicles?
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="haulAwayVehicles"
                  checked={data.haulAwayVehicles || false}
                  onChange={(e) => onChange('haulAwayVehicles', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="haulAwayVehicles" className="text-sm font-medium text-gray-700">
                  Do you haul away vehicles?
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Towing Equipment Used</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Fifth Wheel', 'Tow Bars', 'Reese Hitches', 'Ball Hitches'].map((equipment) => (
                  <label key={equipment} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={data.towingEquipment?.includes(equipment) || false}
                      onChange={(e) => {
                        const current = data.towingEquipment || [];
                        const updated = e.target.checked
                          ? [...current, equipment]
                          : current.filter((item: string) => item !== equipment);
                        onChange('towingEquipment', updated);
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{equipment}</span>
                  </label>
                ))}
              </div>
            </div>

            <InputField
              label="If towing a vehicle for return transportation, how often is this done?"
              id="towingFrequency"
              value={data.towingFrequency || ''}
              onChange={(value) => onChange('towingFrequency', value)}
              error={errors.towingFrequency}
              placeholder="e.g., 25% of trips, rarely, never"
            />
          </div>
        </div>
      </div>
    </div>
  );
}