import React, { useState } from 'react';
import { Users, Plus, Trash2, AlertCircle } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { SelectField } from '../ui/SelectField';
import { TextAreaField } from '../ui/TextAreaField';

interface DriverInformationStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function DriverInformationStep({ data, onChange, errors }: DriverInformationStepProps) {
  const drivers = data.drivers || [];
  
  const addDriver = () => {
    const newDrivers = [...drivers, {
      id: Date.now(),
      name: '',
      dateOfBirth: '',
      licenseState: '',
      licenseNumber: '',
      yearsLicensed: '',
      experienceYears: '',
      employeeType: '',
      accidents: '',
      violations: '',
      convictions: ''
    }];
    onChange('drivers', newDrivers);
  };

  const removeDriver = (id: number) => {
    const newDrivers = drivers.filter((driver: any) => driver.id !== id);
    onChange('drivers', newDrivers);
  };

  const updateDriver = (id: number, field: string, value: any) => {
    const newDrivers = drivers.map((driver: any) => 
      driver.id === id ? { ...driver, [field]: value } : driver
    );
    onChange('drivers', newDrivers);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <Users className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Driver Information</h2>
        <p className="text-gray-600">Add information for all drivers who will be covered</p>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Driver Requirements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Minimum Years Experience Required"
            id="minExperienceRequired"
            type="number"
            value={data.minExperienceRequired || ''}
            onChange={(value) => onChange('minExperienceRequired', value)}
            error={errors.minExperienceRequired}
            placeholder="2"
            helperText="Minimum driving experience for new hires"
          />
          
          <SelectField
            label="Driver Pay Basis"
            id="driverPayBasis"
            value={data.driverPayBasis || ''}
            onChange={(value) => onChange('driverPayBasis', value)}
            error={errors.driverPayBasis}
            options={[
              { value: '', label: 'Select pay basis' },
              { value: 'hourly', label: 'Hourly' },
              { value: 'trip', label: 'Per Trip' },
              { value: 'mileage', label: 'Per Mile' },
              { value: 'other', label: 'Other' }
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Maximum Daily Driving Hours"
            id="maxDailyHours"
            type="number"
            value={data.maxDailyHours || ''}
            onChange={(value) => onChange('maxDailyHours', value)}
            error={errors.maxDailyHours}
            placeholder="10"
          />
          
          <InputField
            label="Maximum Weekly Driving Hours"
            id="maxWeeklyHours"
            type="number"
            value={data.maxWeeklyHours || ''}
            onChange={(value) => onChange('maxWeeklyHours', value)}
            error={errors.maxWeeklyHours}
            placeholder="60"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="workersCompensation"
              checked={data.workersCompensation || false}
              onChange={(e) => onChange('workersCompensation', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="workersCompensation" className="text-sm font-medium text-gray-700">
              Drivers covered by workers' compensation
            </label>
          </div>

          {data.workersCompensation && (
            <div className="pl-6">
              <InputField
                label="Workers' Compensation Carrier"
                id="workersCompCarrier"
                value={data.workersCompCarrier || ''}
                onChange={(value) => onChange('workersCompCarrier', value)}
                error={errors.workersCompCarrier}
                placeholder="Carrier name"
              />
            </div>
          )}

          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="takeVehiclesHome"
              checked={data.takeVehiclesHome || false}
              onChange={(e) => onChange('takeVehiclesHome', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="takeVehiclesHome" className="text-sm font-medium text-gray-700">
              Drivers allowed to take vehicles home overnight
            </label>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="orderMVRs"
              checked={data.orderMVRs || false}
              onChange={(e) => onChange('orderMVRs', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="orderMVRs" className="text-sm font-medium text-gray-700">
              Order MVRs on all drivers prior to hiring
            </label>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="reportNewHires"
              checked={data.reportNewHires || false}
              onChange={(e) => onChange('reportNewHires', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="reportNewHires" className="text-sm font-medium text-gray-700">
              Agree to report all newly hired operators
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Drivers ({drivers.length})</h3>
          <button
            type="button"
            onClick={addDriver}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Driver
          </button>
        </div>

        {drivers.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No drivers added yet</p>
            <button
              type="button"
              onClick={addDriver}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Driver
            </button>
          </div>
        )}

        {drivers.map((driver: any, index: number) => (
          <div key={driver.id} className="bg-gray-50 rounded-lg p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Driver #{index + 1}</h4>
              {drivers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDriver(driver.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Driver Name"
                  id={`driver-${driver.id}-name`}
                  value={driver.name || ''}
                  onChange={(value) => updateDriver(driver.id, 'name', value)}
                  error={errors[`driver-${driver.id}-name`]}
                  placeholder="Full name"
                  required
                />
                
                <InputField
                  label="Date of Birth"
                  id={`driver-${driver.id}-dob`}
                  type="date"
                  value={driver.dateOfBirth || ''}
                  onChange={(value) => updateDriver(driver.id, 'dateOfBirth', value)}
                  error={errors[`driver-${driver.id}-dob`]}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SelectField
                  label="License State"
                  id={`driver-${driver.id}-state`}
                  value={driver.licenseState || ''}
                  onChange={(value) => updateDriver(driver.id, 'licenseState', value)}
                  error={errors[`driver-${driver.id}-state`]}
                  required
                  options={[
                    { value: '', label: 'Select state' },
                    { value: 'AL', label: 'Alabama' },
                    { value: 'CA', label: 'California' },
                    { value: 'FL', label: 'Florida' },
                    { value: 'IL', label: 'Illinois' },
                    { value: 'NY', label: 'New York' },
                    { value: 'TX', label: 'Texas' }
                  ]}
                />
                
                <InputField
                  label="License Number"
                  id={`driver-${driver.id}-license`}
                  value={driver.licenseNumber || ''}
                  onChange={(value) => updateDriver(driver.id, 'licenseNumber', value)}
                  error={errors[`driver-${driver.id}-license`]}
                  placeholder="D123456789"
                  required
                />

                <InputField
                  label="Years Licensed"
                  id={`driver-${driver.id}-years`}
                  type="number"
                  value={driver.yearsLicensed || ''}
                  onChange={(value) => updateDriver(driver.id, 'yearsLicensed', value)}
                  error={errors[`driver-${driver.id}-years`]}
                  placeholder="10"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Commercial Driving Experience (Years)"
                  id={`driver-${driver.id}-experience`}
                  type="number"
                  value={driver.experienceYears || ''}
                  onChange={(value) => updateDriver(driver.id, 'experienceYears', value)}
                  error={errors[`driver-${driver.id}-experience`]}
                  placeholder="5"
                />

                <SelectField
                  label="Employee Type"
                  id={`driver-${driver.id}-type`}
                  value={driver.employeeType || ''}
                  onChange={(value) => updateDriver(driver.id, 'employeeType', value)}
                  error={errors[`driver-${driver.id}-type`]}
                  options={[
                    { value: '', label: 'Select type' },
                    { value: 'employee', label: 'Employee (E)' },
                    { value: 'independent', label: 'Independent Contractor (IC)' },
                    { value: 'owner', label: 'Owner/Operator (O/O)' },
                    { value: 'franchisee', label: 'Franchisee (F)' }
                  ]}
                />
              </div>

              {(driver.accidents || driver.violations || driver.convictions) && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                    <div className="space-y-3 flex-1">
                      <h5 className="font-medium text-gray-900">Driving Record (Past 5 Years)</h5>
                      
                      <TextAreaField
                        label="Accidents"
                        id={`driver-${driver.id}-accidents`}
                        value={driver.accidents || ''}
                        onChange={(value) => updateDriver(driver.id, 'accidents', value)}
                        error={errors[`driver-${driver.id}-accidents`]}
                        placeholder="List dates and brief descriptions of any accidents"
                      />
                      
                      <TextAreaField
                        label="Minor Traffic Violations"
                        id={`driver-${driver.id}-violations`}
                        value={driver.violations || ''}
                        onChange={(value) => updateDriver(driver.id, 'violations', value)}
                        error={errors[`driver-${driver.id}-violations`]}
                        placeholder="List dates and descriptions of minor violations"
                      />
                      
                      <TextAreaField
                        label="Major Convictions"
                        id={`driver-${driver.id}-convictions`}
                        value={driver.convictions || ''}
                        onChange={(value) => updateDriver(driver.id, 'convictions', value)}
                        error={errors[`driver-${driver.id}-convictions`]}
                        placeholder="DWI/DUI, reckless driving, etc."
                        helperText="Include DWI/DUI, hit & run, reckless driving, suspended license, etc."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {drivers.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
              <p className="text-sm text-yellow-800">
                You must add at least one driver to proceed with your application.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}