/*
  # Add remaining application fields

  1. New Columns
    - `additional_operations` (jsonb) - Additional operational details
    - `plate_information` (jsonb) - Vehicle plate information
    - `vehicle_specific_details` (jsonb) - Vehicle type specific details

  2. Indexes
    - Add GIN indexes for efficient JSONB querying

  3. Notes
    - These fields store complex nested data for the remaining form sections
    - All fields are nullable to support partial form completion
*/

-- Add new JSONB columns for remaining form sections
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'additional_operations'
  ) THEN
    ALTER TABLE applications ADD COLUMN additional_operations jsonb DEFAULT '{}'::jsonb;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'plate_information'
  ) THEN
    ALTER TABLE applications ADD COLUMN plate_information jsonb DEFAULT '{}'::jsonb;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'vehicle_specific_details'
  ) THEN
    ALTER TABLE applications ADD COLUMN vehicle_specific_details jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- Add indexes for efficient JSONB querying
CREATE INDEX IF NOT EXISTS idx_applications_additional_operations 
  ON applications USING gin (additional_operations);

CREATE INDEX IF NOT EXISTS idx_applications_plate_information 
  ON applications USING gin (plate_information);

CREATE INDEX IF NOT EXISTS idx_applications_vehicle_specific_details 
  ON applications USING gin (vehicle_specific_details);