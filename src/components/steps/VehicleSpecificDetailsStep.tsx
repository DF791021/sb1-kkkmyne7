import React from 'react';
import { Car, Bus, Truck } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { TextAreaField } from '../ui/TextAreaField';

interface VehicleSpecificDetailsStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function VehicleSpecificDetailsStep({ data, onChange, errors }: VehicleSpecificDetailsStepProps) {
  // Helper function to ensure percentages add up to 100
  const updatePercentage = (category: string, field: string, value: string) => {
    const newData = {
      ...data[category],
      [field]: value
    };
    onChange(category, newData);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
          <Car className="w-8 h-8 text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Vehicle Specific Details</h2>
        <p className="text-gray-600">Specific information based on the types of vehicles you drive away</p>
      </div>

      <div className="space-y-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Car className="w-5 h-5 text-blue-600 mr-2" />
            Private Passenger Drive-Away
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="driveAwaySportsLuxury"
                checked={data.driveAwaySportsLuxury || false}
                onChange={(e) => onChange('driveAwaySportsLuxury', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="driveAwaySportsLuxury" className="text-sm font-medium text-gray-700">
                Do you drive-away sports cars or luxury type units?
              </label>
            </div>

            {data.driveAwaySportsLuxury && (
              <div className="pl-6">
                <TextAreaField
                  label="List Unit Model(s)"
                  id="sportsLuxuryModels"
                  value={data.sportsLuxuryModels || ''}
                  onChange={(value) => onChange('sportsLuxuryModels', value)}
                  error={errors.sportsLuxuryModels}
                  placeholder="e.g., BMW M5, Mercedes S-Class, Porsche 911, Tesla Model S"
                  helperText="List specific makes and models of luxury/sports vehicles"
                  required
                />
              </div>
            )}

            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="towSecondVehicle"
                checked={data.towSecondVehicle || false}
                onChange={(e) => onChange('towSecondVehicle', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="towSecondVehicle" className="text-sm font-medium text-gray-700">
                Do you tow a second client-owned vehicle?
              </label>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bus className="w-5 h-5 text-green-600 mr-2" />
            Bus Drive-Away
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="font-medium text-gray-900 mb-3">Percentage of time units with the following seating capacities are driven away:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Under 20 Passengers"
                  id="busUnder20"
                  type="number"
                  value={data.busCapacities?.under20 || ''}
                  onChange={(value) => updatePercentage('busCapacities', 'under20', value)}
                  error={errors.busUnder20}
                  placeholder="60"
                  helperText="Percentage (0-100)"
                />
                
                <InputField
                  label="21 and Over Passengers"
                  id="bus21AndOver"
                  type="number"
                  value={data.busCapacities?.over21 || ''}
                  onChange={(value) => updatePercentage('busCapacities', 'over21', value)}
                  error={errors.bus21AndOver}
                  placeholder="40"
                  helperText="Percentage (0-100)"
                />
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Note: Percentages should total 100%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Truck className="w-5 h-5 text-orange-600 mr-2" />
            Truck/Tractor Drive-Away
          </h3>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <h4 className="font-medium text-gray-900 mb-3">Percentage of time each unit type is driven away:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField
                  label="Trucks"
                  id="truckPercentage"
                  type="number"
                  value={data.truckTypes?.trucks || ''}
                  onChange={(value) => updatePercentage('truckTypes', 'trucks', value)}
                  error={errors.truckPercentage}
                  placeholder="50"
                  helperText="Percentage (0-100)"
                />
                
                <InputField
                  label="Tractors"
                  id="tractorPercentage"
                  type="number"
                  value={data.truckTypes?.tractors || ''}
                  onChange={(value) => updatePercentage('truckTypes', 'tractors', value)}
                  error={errors.tractorPercentage}
                  placeholder="30"
                  helperText="Percentage (0-100)"
                />
                
                <InputField
                  label="Tractors and Trailers"
                  id="tractorTrailerPercentage"
                  type="number"
                  value={data.truckTypes?.tractorTrailers || ''}
                  onChange={(value) => updatePercentage('truckTypes', 'tractorTrailers', value)}
                  error={errors.tractorTrailerPercentage}
                  placeholder="20"
                  helperText="Percentage (0-100)"
                />
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Note: Percentages should total 100%
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <h4 className="font-medium text-gray-900 mb-3">If trucks, percentage of each GVW driven away:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField
                  label="0-20,000 lbs"
                  id="gvw0to20k"
                  type="number"
                  value={data.truckGVW?.gvw0to20k || ''}
                  onChange={(value) => updatePercentage('truckGVW', 'gvw0to20k', value)}
                  error={errors.gvw0to20k}
                  placeholder="40"
                  helperText="Light trucks (%)"
                />
                
                <InputField
                  label="20,001-45,000 lbs"
                  id="gvw20to45k"
                  type="number"
                  value={data.truckGVW?.gvw20to45k || ''}
                  onChange={(value) => updatePercentage('truckGVW', 'gvw20to45k', value)}
                  error={errors.gvw20to45k}
                  placeholder="35"
                  helperText="Medium trucks (%)"
                />
                
                <InputField
                  label="45,001+ lbs"
                  id="gvw45kPlus"
                  type="number"
                  value={data.truckGVW?.gvw45kPlus || ''}
                  onChange={(value) => updatePercentage('truckGVW', 'gvw45kPlus', value)}
                  error={errors.gvw45kPlus}
                  placeholder="25"
                  helperText="Heavy trucks (%)"
                />
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Note: Percentages should total 100%
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <h4 className="font-medium text-gray-900 mb-4">Piggyback Operations</h4>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    id="doPiggyback"
                    checked={data.doPiggyback || false}
                    onChange={(e) => onChange('doPiggyback', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="doPiggyback" className="text-sm font-medium text-gray-700">
                    Do you piggyback?
                  </label>
                </div>

                {data.doPiggyback && (
                  <div className="pl-6 space-y-4">
                    <InputField
                      label="What percentage of time do you piggyback?"
                      id="piggybackPercentage"
                      type="number"
                      value={data.piggybackPercentage || ''}
                      onChange={(value) => onChange('piggybackPercentage', value)}
                      error={errors.piggybackPercentage}
                      placeholder="30"
                      helperText="Percentage of operations involving piggyback"
                      required
                    />

                    <div className="bg-gray-50 rounded p-4">
                      <h5 className="font-medium text-gray-900 mb-3">Piggyback Configuration Percentages:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputField
                          label="1 Up"
                          id="piggyback1Up"
                          type="number"
                          value={data.piggybackConfig?.oneUp || ''}
                          onChange={(value) => updatePercentage('piggybackConfig', 'oneUp', value)}
                          error={errors.piggyback1Up}
                          placeholder="60"
                          helperText="Single vehicle (%)"
                        />
                        
                        <InputField
                          label="2 Up"
                          id="piggyback2Up"
                          type="number"
                          value={data.piggybackConfig?.twoUp || ''}
                          onChange={(value) => updatePercentage('piggybackConfig', 'twoUp', value)}
                          error={errors.piggyback2Up}
                          placeholder="30"
                          helperText="Two vehicles (%)"
                        />
                        
                        <InputField
                          label="3 Up"
                          id="piggyback3Up"
                          type="number"
                          value={data.piggybackConfig?.threeUp || ''}
                          onChange={(value) => updatePercentage('piggybackConfig', 'threeUp', value)}
                          error={errors.piggyback3Up}
                          placeholder="10"
                          helperText="Three vehicles (%)"
                        />
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Note: Percentages should total 100%
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}