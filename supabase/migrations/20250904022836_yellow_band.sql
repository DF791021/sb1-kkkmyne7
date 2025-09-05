/*
  # Drive-Away Insurance Application Database Schema

  1. New Tables
    - `applications`
      - Complete application data with all form fields
      - Tracks submission status and timestamps
      - Links to related drivers and insurance history
    - `drivers`
      - Individual driver information
      - Links to parent application
    - `prior_insurance`
      - Previous insurance carrier history
      - Links to parent application
    - `application_submissions`
      - Tracks submission attempts and email status

  2. Security
    - Enable RLS on all tables
    - Public insert access for form submissions
    - Admin-only read access for processing

  3. Features
    - Auto-generated application numbers
    - Timestamp tracking for submissions
    - JSON storage for flexible data structure
    - Email status tracking
*/

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_number text UNIQUE NOT NULL DEFAULT ('DA-' || EXTRACT(epoch FROM now())::bigint),
  
  -- Company Information
  company_name text NOT NULL,
  dba text,
  business_type text NOT NULL,
  business_phone text NOT NULL,
  mailing_address jsonb NOT NULL,
  premises_address jsonb,
  same_address boolean DEFAULT true,
  contact_person text NOT NULL,
  
  -- Business Operations
  business_description text NOT NULL,
  years_experience integer NOT NULL,
  new_venture boolean DEFAULT false,
  primary_business boolean DEFAULT true,
  other_business text,
  gross_receipts_last_year text,
  estimated_receipts text,
  business_for_sale boolean DEFAULT false,
  bankruptcy_history boolean DEFAULT false,
  bankruptcy_details jsonb,
  operation_details jsonb,
  
  -- Coverage Selection
  liability_coverage jsonb NOT NULL,
  additional_coverage jsonb,
  physical_damage_coverage jsonb,
  
  -- Driver Requirements
  driver_requirements jsonb,
  
  -- Loss History
  columbia_insurance_history jsonb,
  disclosure_questions jsonb,
  
  -- Drive-Away Operations
  drive_away_operations jsonb NOT NULL,
  
  -- Metadata
  status text DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'declined')),
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Drivers table
CREATE TABLE IF NOT EXISTS drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE,
  
  -- Basic Information
  driver_name text NOT NULL,
  date_of_birth date NOT NULL,
  license_state text NOT NULL,
  license_number text NOT NULL,
  license_class text,
  years_licensed integer NOT NULL,
  
  -- Experience
  commercial_experience_years integer,
  employee_type text CHECK (employee_type IN ('employee', 'independent', 'owner', 'franchisee')),
  hire_date date,
  
  -- Driving Record
  accidents jsonb DEFAULT '[]',
  violations jsonb DEFAULT '[]',
  major_convictions jsonb DEFAULT '[]',
  
  created_at timestamptz DEFAULT now()
);

-- Prior Insurance table
CREATE TABLE IF NOT EXISTS prior_insurance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE,
  
  carrier_name text NOT NULL,
  policy_term_from date,
  policy_term_to date,
  number_of_vehicles integer,
  number_of_accidents integer DEFAULT 0,
  premium_liability text,
  premium_physical_damage text,
  claims_paid text,
  
  created_at timestamptz DEFAULT now()
);

-- Application Submissions tracking
CREATE TABLE IF NOT EXISTS application_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE,
  
  submission_data jsonb NOT NULL,
  email_sent boolean DEFAULT false,
  email_sent_at timestamptz,
  email_error text,
  
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE prior_insurance ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public form submission
CREATE POLICY "Allow public insert on applications"
  ON applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public insert on drivers"
  ON drivers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public insert on prior_insurance"
  ON prior_insurance
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public insert on application_submissions"
  ON application_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Admin policies for authenticated users
CREATE POLICY "Admin can read all applications"
  ON applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can update applications"
  ON applications
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admin can read all drivers"
  ON drivers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can read all prior_insurance"
  ON prior_insurance
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can read all submissions"
  ON application_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for updated_at
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_submitted_at ON applications(submitted_at);
CREATE INDEX IF NOT EXISTS idx_applications_number ON applications(application_number);
CREATE INDEX IF NOT EXISTS idx_drivers_application_id ON drivers(application_id);
CREATE INDEX IF NOT EXISTS idx_prior_insurance_application_id ON prior_insurance(application_id);