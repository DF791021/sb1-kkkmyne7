import React from 'react';
import { Building2, MapPin, Phone, User } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { SelectField } from '../ui/SelectField';

interface CompanyInfoStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function CompanyInfoStep({ data, onChange, errors }: CompanyInfoStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Building2 className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Information</h2>
        <p className="text-gray-600">Let's start with some basic information about your business</p>
      </div>

      <div className="space-y-6">
        <InputField
          label="Company Name"
          id="companyName"
          value={data.companyName || ''}
          onChange={(value) => onChange('companyName', value)}
          error={errors.companyName}
          placeholder="Enter your company name"
          icon={<Building2 className="w-5 h-5 text-gray-400" />}
          required
        />

        <InputField
          label="DBA (Doing Business As)"
          id="dba"
          value={data.dba || ''}
          onChange={(value) => onChange('dba', value)}
          error={errors.dba}
          placeholder="If different from company name"
          helperText="Leave blank if same as company name"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label="Business Type"
            id="businessType"
            value={data.businessType || ''}
            onChange={(value) => onChange('businessType', value)}
            error={errors.businessType}
            required
            options={[
              { value: '', label: 'Select business type' },
              { value: 'individual', label: 'Individual/Proprietorship' },
              { value: 'partnership', label: 'Partnership' },
              { value: 'corporation', label: 'Corporation' },
              { value: 'other', label: 'Other' }
            ]}
          />

          <InputField
            label="Business Phone"
            id="businessPhone"
            value={data.businessPhone || ''}
            onChange={(value) => onChange('businessPhone', value)}
            error={errors.businessPhone}
            placeholder="(555) 123-4567"
            icon={<Phone className="w-5 h-5 text-gray-400" />}
            required
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPin className="w-5 h-5 text-gray-600 mr-2" />
            Business Addresses
          </h3>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Mailing Address</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Street Address"
                id="mailingStreet"
                value={data.mailingStreet || ''}
                onChange={(value) => onChange('mailingStreet', value)}
                error={errors.mailingStreet}
                placeholder="123 Main Street"
                required
              />
              <InputField
                label="City"
                id="mailingCity"
                value={data.mailingCity || ''}
                onChange={(value) => onChange('mailingCity', value)}
                error={errors.mailingCity}
                placeholder="City"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="State"
                id="mailingState"
                value={data.mailingState || ''}
                onChange={(value) => onChange('mailingState', value)}
                error={errors.mailingState}
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
                label="ZIP Code"
                id="mailingZip"
                value={data.mailingZip || ''}
                onChange={(value) => onChange('mailingZip', value)}
                error={errors.mailingZip}
                placeholder="12345"
                required
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="sameAddress"
                checked={data.sameAddress || false}
                onChange={(e) => onChange('sameAddress', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="sameAddress" className="ml-2 text-sm text-gray-700">
                Premises address is the same as mailing address
              </label>
            </div>
            
            {!data.sameAddress && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Premises Address</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Street Address"
                    id="premisesStreet"
                    value={data.premisesStreet || ''}
                    onChange={(value) => onChange('premisesStreet', value)}
                    error={errors.premisesStreet}
                    placeholder="123 Business Blvd"
                  />
                  <InputField
                    label="City"
                    id="premisesCity"
                    value={data.premisesCity || ''}
                    onChange={(value) => onChange('premisesCity', value)}
                    error={errors.premisesCity}
                    placeholder="City"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectField
                    label="State"
                    id="premisesState"
                    value={data.premisesState || ''}
                    onChange={(value) => onChange('premisesState', value)}
                    error={errors.premisesState}
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
                    label="ZIP Code"
                    id="premisesZip"
                    value={data.premisesZip || ''}
                    onChange={(value) => onChange('premisesZip', value)}
                    error={errors.premisesZip}
                    placeholder="12345"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <InputField
          label="Contact Person for Inspection"
          id="contactPerson"
          value={data.contactPerson || ''}
          onChange={(value) => onChange('contactPerson', value)}
          error={errors.contactPerson}
          placeholder="Name and phone number"
          icon={<User className="w-5 h-5 text-gray-400" />}
          helperText="Include name and phone number for inspection scheduling"
          required
        />
      </div>
    </div>
  );
}