/*
  # Add remaining application fields

  1. New Columns
    - `additional_operations` (jsonb) - Towing, insurance filings, driver restrictions
    - `plate_information` (jsonb) - Vehicle plate details and management
    - `vehicle_specific_details` (jsonb) - Type-specific vehicle information

  2. Data Structure
    - Stores complex operational details in structured JSONB format
    - Maintains existing data integrity
    - Supports all original form fields from PDF
*/

DO $$
BEGIN
  -- Add additional_operations column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'additional_operations'
  ) THEN
    ALTER TABLE applications ADD COLUMN additional_operations jsonb DEFAULT '{}'::jsonb;
  END IF;

  -- Add plate_information column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'plate_information'
  ) THEN
    ALTER TABLE applications ADD COLUMN plate_information jsonb DEFAULT '{}'::jsonb;
  END IF;

  -- Add vehicle_specific_details column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'vehicle_specific_details'
  ) THEN
    ALTER TABLE applications ADD COLUMN vehicle_specific_details jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- Add indexes for the new JSONB columns for better query performance
CREATE INDEX IF NOT EXISTS idx_applications_additional_operations 
ON applications USING gin (additional_operations);

CREATE INDEX IF NOT EXISTS idx_applications_plate_information 
ON applications USING gin (plate_information);

CREATE INDEX IF NOT EXISTS idx_applications_vehicle_specific_details 
ON applications USING gin (vehicle_specific_details);