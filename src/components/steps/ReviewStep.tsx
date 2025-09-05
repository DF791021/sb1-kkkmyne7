import React from 'react';
import { CheckCircle, Building2, Users, Shield, Truck, FileText, MapPin, Hash, Car } from 'lucide-react';

interface ReviewStepProps {
  data: any;
}

export function ReviewStep({ data }: ReviewStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Application</h2>
        <p className="text-gray-600">Please review all information before submitting</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Building2 className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Company:</span>
              <p className="font-medium">{data.companyName || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-gray-500">Business Type:</span>
              <p className="font-medium capitalize">{data.businessType || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-gray-500">Phone:</span>
              <p className="font-medium">{data.businessPhone || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-gray-500">Contact Person:</span>
              <p className="font-medium">{data.contactPerson || 'Not provided'}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Briefcase className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Business Operations</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-500">Years Experience:</span>
              <p className="font-medium">{data.yearsExperience || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-gray-500">Business Description:</span>
              <p className="font-medium">{data.businessDescription || 'Not provided'}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Coverage Selection</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-500">Liability Coverage:</span>
              <p className="font-medium">
                {data.liabilityCoverageType === 'combined' 
                  ? `Combined Single Limit: $${parseInt(data.combinedLimit || '0').toLocaleString()}`
                  : data.liabilityCoverageType === 'split'
                    ? `Split Limits: $${parseInt(data.bodilyInjuryPerPerson || '0').toLocaleString()}/$${parseInt(data.bodilyInjuryPerAccident || '0').toLocaleString()}/$${parseInt(data.propertyDamage || '0').toLocaleString()}`
                    : 'Not selected'
                }
              </p>
            </div>
            {data.physicalDamageDesired && (
              <div>
                <span className="text-gray-500">Physical Damage:</span>
                <p className="font-medium">
                  Comprehensive: ${data.comprehensiveDeductible} deductible, 
                  Collision: ${data.collisionDeductible} deductible
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Users className="w-5 h-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Drivers ({(data.drivers || []).length})</h3>
          </div>
          {(data.drivers || []).map((driver: any, index: number) => (
            <div key={driver.id} className="mb-4 p-4 bg-white rounded border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Driver #{index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Name:</span>
                  <p className="font-medium">{driver.name || 'Not provided'}</p>
                </div>
                <div>
                  <span className="text-gray-500">License:</span>
                  <p className="font-medium">{driver.licenseState} {driver.licenseNumber}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Truck className="w-5 h-5 text-orange-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Drive-Away Operations</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-500">Payment Method:</span>
              <p className="font-medium capitalize">{data.paymentMethod || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-gray-500">Pickup Locations:</span>
              <p className="font-medium">{data.pickupLocations || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-gray-500">Delivery Locations:</span>
              <p className="font-medium">{data.deliveryLocations || 'Not provided'}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Additional Operations</h3>
          </div>
          <div className="space-y-3 text-sm">
            {data.requireInsuranceFilings && (
              <div>
                <span className="text-gray-500">Insurance Filings:</span>
                <p className="font-medium">{data.filingType?.toUpperCase()} {data.mcNumber && `(MC: ${data.mcNumber})`}</p>
              </div>
            )}
            <div>
              <span className="text-gray-500">Driver Safety:</span>
              <p className="font-medium">
                Max Daily: {data.maxDailyDrivingHours || 'Not specified'} hours, 
                Max Weekly: {data.maxWeeklyDrivingHours || 'Not specified'} hours
              </p>
            </div>
          </div>
        </div>

        {data.requiredToUsePlates && (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Hash className="w-5 h-5 text-emerald-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Plate Information</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500">Total Plates:</span>
                <p className="font-medium">{data.totalNumberOfPlates} ({data.plateType})</p>
              </div>
              <div>
                <span className="text-gray-500">Average In Use:</span>
                <p className="font-medium">{data.averagePlatesInUse} plates</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Car className="w-5 h-5 text-teal-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Vehicle Specific Details</h3>
          </div>
          <div className="space-y-3 text-sm">
            {data.driveAwaySportsLuxury && (
              <div>
                <span className="text-gray-500">Sports/Luxury Vehicles:</span>
                <p className="font-medium">{data.sportsLuxuryModels}</p>
              </div>
            )}
            {data.doPiggyback && (
              <div>
                <span className="text-gray-500">Piggyback Operations:</span>
                <p className="font-medium">{data.piggybackPercentage}% of the time</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Notes</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              Your application will be reviewed by our underwriting team within 2 business days
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              You may be contacted for additional information or clarification
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              Policy documents will be emailed once approved and payment is processed
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}