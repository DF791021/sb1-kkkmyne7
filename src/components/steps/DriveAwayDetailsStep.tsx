import React from 'react';
import { Truck, MapPin, Route } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { SelectField } from '../ui/SelectField';
import { TextAreaField } from '../ui/TextAreaField';

interface DriveAwayDetailsStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function DriveAwayDetailsStep({ data, onChange, errors }: DriveAwayDetailsStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
          <Truck className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Drive-Away Operations</h2>
        <p className="text-gray-600">Tell us about your specific drive-away operations</p>
      </div>

      <div className="space-y-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Information</h3>
          
          <div className="space-y-4">
            <TextAreaField
              label="Types of Units Driven Away"
              id="unitTypes"
              value={data.unitTypes || ''}
              onChange={(value) => onChange('unitTypes', value)}
              error={errors.unitTypes}
              placeholder="List the types of vehicles you drive away and their percentages"
              helperText="E.g., Pickup trucks (40%), Sedans (30%), SUVs (30%)"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="New Units Percentage"
                id="newUnitsPercentage"
                type="number"
                value={data.newUnitsPercentage || ''}
                onChange={(value) => onChange('newUnitsPercentage', value)}
                error={errors.newUnitsPercentage}
                placeholder="75"
                helperText="Percentage of time driving new units"
              />
              
              <InputField
                label="Used Units Percentage"
                id="usedUnitsPercentage"
                type="number"
                value={data.usedUnitsPercentage || ''}
                onChange={(value) => onChange('usedUnitsPercentage', value)}
                error={errors.usedUnitsPercentage}
                placeholder="25"
                helperText="Should total 100% with new units"
              />
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Route className="w-5 h-5 text-green-600 mr-2" />
            Operational Details
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Payment Method"
                id="paymentMethod"
                value={data.paymentMethod || ''}
                onChange={(value) => onChange('paymentMethod', value)}
                error={errors.paymentMethod}
                required
                options={[
                  { value: '', label: 'Select payment method' },
                  { value: 'miles', label: 'By Miles' },
                  { value: 'trip', label: 'By Trip' }
                ]}
              />

              {data.paymentMethod === 'miles' && (
                <InputField
                  label="Rate Per Mile"
                  id="ratePerMile"
                  value={data.ratePerMile || ''}
                  onChange={(value) => onChange('ratePerMile', value)}
                  error={errors.ratePerMile}
                  placeholder="$1.25"
                  helperText="Average rate paid per mile"
                />
              )}

              {data.paymentMethod === 'trip' && (
                <InputField
                  label="Rate Per Trip"
                  id="ratePerTrip"
                  value={data.ratePerTrip || ''}
                  onChange={(value) => onChange('ratePerTrip', value)}
                  error={errors.ratePerTrip}
                  placeholder="$350"
                  helperText="Average rate paid per trip"
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Full-Time Drivers"
                id="fullTimeDrivers"
                type="number"
                value={data.fullTimeDrivers || ''}
                onChange={(value) => onChange('fullTimeDrivers', value)}
                error={errors.fullTimeDrivers}
                placeholder="8"
              />
              
              <InputField
                label="Part-Time Drivers"
                id="partTimeDrivers"
                type="number"
                value={data.partTimeDrivers || ''}
                onChange={(value) => onChange('partTimeDrivers', value)}
                error={errors.partTimeDrivers}
                placeholder="3"
              />

              <InputField
                label="Trips Per Week"
                id="tripsPerWeek"
                type="number"
                value={data.tripsPerWeek || ''}
                onChange={(value) => onChange('tripsPerWeek', value)}
                error={errors.tripsPerWeek}
                placeholder="25"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Maximum Radius (One-Way)"
                id="maxRadius"
                value={data.maxRadius || ''}
                onChange={(value) => onChange('maxRadius', value)}
                error={errors.maxRadius}
                placeholder="500 miles"
              />
              
              <InputField
                label="Average Radius (One-Way)"
                id="averageRadius"
                value={data.averageRadius || ''}
                onChange={(value) => onChange('averageRadius', value)}
                error={errors.averageRadius}
                placeholder="250 miles"
              />
              
              <InputField
                label="Estimated Annual Mileage"
                id="annualMileage"
                type="number"
                value={data.annualMileage || ''}
                onChange={(value) => onChange('annualMileage', value)}
                error={errors.annualMileage}
                placeholder="100000"
              />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 text-purple-600 mr-2" />
            Pickup & Delivery Locations
          </h3>
          
          <div className="space-y-4">
            <TextAreaField
              label="Pickup Cities and States"
              id="pickupLocations"
              value={data.pickupLocations || ''}
              onChange={(value) => onChange('pickupLocations', value)}
              error={errors.pickupLocations}
              placeholder="List cities and states where vehicles are picked up"
              required
            />
            
            <TextAreaField
              label="Delivery Cities and States"
              id="deliveryLocations"
              value={data.deliveryLocations || ''}
              onChange={(value) => onChange('deliveryLocations', value)}
              error={errors.deliveryLocations}
              placeholder="List destination cities and states"
              required
            />
            
            <TextAreaField
              label="Client List"
              id="clientList"
              value={data.clientList || ''}
              onChange={(value) => onChange('clientList', value)}
              error={errors.clientList}
              placeholder="List your main clients"
              helperText="Include dealerships, manufacturers, or other clients"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="deliverBothWays"
              checked={data.deliverBothWays || false}
              onChange={(e) => onChange('deliverBothWays', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="deliverBothWays" className="text-sm font-medium text-gray-700">
              Deliver vehicles both ways
            </label>
          </div>

          <TextAreaField
            label="Return Trip Handling"
            id="returnTripHandling"
            value={data.returnTripHandling || ''}
            onChange={(value) => onChange('returnTripHandling', value)}
            error={errors.returnTripHandling}
            placeholder="Describe how return trips are handled"
          />

          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="hasOtherOperations"
              checked={data.hasOtherOperations || false}
              onChange={(e) => onChange('hasOtherOperations', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="hasOtherOperations" className="text-sm font-medium text-gray-700">
              Operations other than drive-away service
            </label>
          </div>

          {data.hasOtherOperations && (
            <div className="pl-6">
              <TextAreaField
                label="Other Operations"
                id="otherOperations"
                value={data.otherOperations || ''}
                onChange={(value) => onChange('otherOperations', value)}
                error={errors.otherOperations}
                placeholder="Describe other business operations"
                required
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}