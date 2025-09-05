import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set up your Supabase project.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ApplicationSubmission {
  // Company Information
  companyName: string;
  dba?: string;
  businessType: string;
  businessPhone: string;
  mailingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  premisesAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  sameAddress: boolean;
  contactPerson: string;
  
  // Business Operations
  businessDescription: string;
  yearsExperience: number;
  newVenture: boolean;
  primaryBusiness: boolean;
  otherBusiness?: string;
  grossReceiptsLastYear?: string;
  estimatedReceipts?: string;
  businessForSale: boolean;
  bankruptcyHistory: boolean;
  bankruptcyDetails?: {
    date: string;
    explanation: string;
  };
  operationDetails: {
    multipleStates: boolean;
    operationStates?: string;
    regularRoute: boolean;
    routeTowns?: string;
  };
  
  // Coverage
  liabilityCoverage: {
    coverageType: string;
    combinedLimit?: string;
    splitLimits?: {
      bodilyInjuryPerPerson: string;
      bodilyInjuryPerAccident: string;
      propertyDamage: string;
    };
  };
  additionalCoverage: {
    medicalPayments?: string;
    personalInjuryProtection?: string;
    uninsuredMotorist: boolean;
    underinsuredMotorist: boolean;
  };
  physicalDamageCoverage: {
    desired: boolean;
    averageVehicleValue?: string;
    maximumVehicleValue?: string;
    comprehensiveDeductible?: string;
    collisionDeductible?: string;
  };
  
  // Driver Requirements
  driverRequirements: {
    minExperienceRequired?: string;
    driverPayBasis?: string;
    maxDailyHours?: string;
    maxWeeklyHours?: string;
    workersCompensation: boolean;
    workersCompCarrier?: string;
    takeVehiclesHome: boolean;
    orderMVRs: boolean;
    reportNewHires: boolean;
  };
  
  // Loss History
  columbiaInsuranceHistory: {
    hadPrevious: boolean;
    policyNumbers?: string;
    effectiveDates?: string;
  };
  disclosureQuestions: {
    awareOfClaims: boolean;
    claimDetails?: string;
    declinedInsurance: boolean;
    declinedReason?: string;
  };
  
  // Drive-Away Operations
  driveAwayOperations: {
    unitTypes: string;
    newUnitsPercentage?: string;
    usedUnitsPercentage?: string;
    paymentMethod: string;
    ratePerMile?: string;
    ratePerTrip?: string;
    fullTimeDrivers?: string;
    partTimeDrivers?: string;
    tripsPerWeek?: string;
    maxRadius?: string;
    averageRadius?: string;
    annualMileage?: string;
    pickupLocations: string;
    deliveryLocations: string;
    clientList?: string;
    deliverBothWays: boolean;
    returnTripHandling?: string;
    hasOtherOperations: boolean;
    otherOperations?: string;
  };
  
  // Additional Operations
  additionalOperations: {
    maxDailyDrivingHours?: string;
    maxWeeklyDrivingHours?: string;
    driversAllowedHome: boolean;
    familyMembersDrive: boolean;
    requireInsuranceFilings: boolean;
    filingType?: string;
    mcNumber?: string;
    returnTripDetails?: string;
    deliveryWithTowing: boolean;
    driversOwnVehicles: boolean;
    haulAwayVehicles: boolean;
    towingEquipment: string[];
    towingFrequency?: string;
  };
  
  // Plate Information
  plateInformation: {
    requiredToUsePlates: boolean;
    useOwnPlatesExclusively: boolean;
    totalNumberOfPlates?: string;
    plateType?: string;
    otherPlateType?: string;
    platesPerUnit?: string;
    averagePlatesInUse?: string;
    plateReturnMethod?: string;
    plateReturnDays?: string;
    plateIdentificationNumbers?: string;
    allPlatesInsured: boolean;
    plateExclusions?: string;
    numberOfOperators?: string;
    operatorsHaveContracts: boolean;
  };
  
  // Vehicle Specific Details
  vehicleSpecificDetails: {
    driveAwaySportsLuxury: boolean;
    sportsLuxuryModels?: string;
    towSecondVehicle: boolean;
    busCapacities: {
      under20?: string;
      over21?: string;
    };
    truckTypes: {
      trucks?: string;
      tractors?: string;
      tractorTrailers?: string;
    };
    truckGVW: {
      gvw0to20k?: string;
      gvw20to45k?: string;
      gvw45kPlus?: string;
    };
    doPiggyback: boolean;
    piggybackPercentage?: string;
    piggybackConfig: {
      oneUp?: string;
      twoUp?: string;
      threeUp?: string;
    };
  };
}