import { useState, useCallback, useEffect } from 'react';

export interface ApplicationData {
  // Company Info
  companyName: string;
  dba: string;
  businessType: string;
  businessPhone: string;
  mailingStreet: string;
  mailingCity: string;
  mailingState: string;
  mailingZip: string;
  sameAddress: boolean;
  premisesStreet: string;
  premisesCity: string;
  premisesState: string;
  premisesZip: string;
  contactPerson: string;
  
  // Business Operations
  businessDescription: string;
  yearsExperience: string;
  newVenture: boolean;
  primaryBusiness: boolean;
  otherBusiness: string;
  grossReceiptsLastYear: string;
  estimatedReceipts: string;
  businessForSale: boolean;
  bankruptcyHistory: boolean;
  bankruptcyDate: string;
  bankruptcyExplanation: string;
  multipleStates: boolean;
  operationStates: string;
  regularRoute: boolean;
  routeTowns: string;
  
  // Coverage
  liabilityCoverageType: string;
  combinedLimit: string;
  bodilyInjuryPerPerson: string;
  bodilyInjuryPerAccident: string;
  propertyDamage: string;
  medicalPayments: string;
  personalInjuryProtection: string;
  uninsuredMotorist: boolean;
  underinsuredMotorist: boolean;
  physicalDamageDesired: boolean;
  averageVehicleValue: string;
  maximumVehicleValue: string;
  comprehensiveDeductible: string;
  collisionDeductible: string;
  
  // Drivers
  drivers: any[];
  minExperienceRequired: string;
  driverPayBasis: string;
  maxDailyHours: string;
  maxWeeklyHours: string;
  workersCompensation: boolean;
  workersCompCarrier: string;
  takeVehiclesHome: boolean;
  orderMVRs: boolean;
  reportNewHires: boolean;
  
  // History
  hadColumbiaInsurance: boolean;
  previousPolicyNumbers: string;
  previousEffectiveDates: string;
  priorInsurance: any[];
  awareOfClaims: boolean;
  claimDetails: string;
  declinedInsurance: boolean;
  declinedReason: string;
  
  // Drive-Away Details
  unitTypes: string;
  newUnitsPercentage: string;
  usedUnitsPercentage: string;
  paymentMethod: string;
  ratePerMile: string;
  ratePerTrip: string;
  fullTimeDrivers: string;
  partTimeDrivers: string;
  tripsPerWeek: string;
  maxRadius: string;
  averageRadius: string;
  annualMileage: string;
  pickupLocations: string;
  deliveryLocations: string;
  clientList: string;
  deliverBothWays: boolean;
  returnTripHandling: string;
  hasOtherOperations: boolean;
  otherOperations: string;
  
  // Additional Operations
  maxDailyDrivingHours: string;
  maxWeeklyDrivingHours: string;
  driversAllowedHome: boolean;
  familyMembersDrive: boolean;
  requireInsuranceFilings: boolean;
  filingType: string;
  mcNumber: string;
  returnTripDetails: string;
  deliveryWithTowing: boolean;
  driversOwnVehicles: boolean;
  haulAwayVehicles: boolean;
  towingEquipment: string[];
  towingFrequency: string;
  
  // Plate Information
  requiredToUsePlates: boolean;
  useOwnPlatesExclusively: boolean;
  totalNumberOfPlates: string;
  plateType: string;
  otherPlateType: string;
  platesPerUnit: string;
  averagePlatesInUse: string;
  plateReturnMethod: string;
  plateReturnDays: string;
  plateIdentificationNumbers: string;
  allPlatesInsured: boolean;
  plateExclusions: string;
  numberOfOperators: string;
  operatorsHaveContracts: boolean;
  
  // Vehicle Specific Details
  driveAwaySportsLuxury: boolean;
  sportsLuxuryModels: string;
  towSecondVehicle: boolean;
  busCapacities: {
    under20: string;
    over21: string;
  };
  truckTypes: {
    trucks: string;
    tractors: string;
    tractorTrailers: string;
  };
  truckGVW: {
    gvw0to20k: string;
    gvw20to45k: string;
    gvw45kPlus: string;
  };
  doPiggyback: boolean;
  piggybackPercentage: string;
  piggybackConfig: {
    oneUp: string;
    twoUp: string;
    threeUp: string;
  };
  
  // Additional Operations
  maxDailyDrivingHours: string;
  maxWeeklyDrivingHours: string;
  driversAllowedHome: boolean;
  familyMembersDrive: boolean;
  requireInsuranceFilings: boolean;
  filingType: string;
  mcNumber: string;
  returnTripDetails: string;
  deliveryWithTowing: boolean;
  driversOwnVehicles: boolean;
  haulAwayVehicles: boolean;
  towingEquipment: string[];
  towingFrequency: string;
  
  // Plate Information
  requiredToUsePlates: boolean;
  useOwnPlatesExclusively: boolean;
  totalNumberOfPlates: string;
  plateType: string;
  otherPlateType: string;
  platesPerUnit: string;
  averagePlatesInUse: string;
  plateReturnMethod: string;
  plateReturnDays: string;
  plateIdentificationNumbers: string;
  allPlatesInsured: boolean;
  plateExclusions: string;
  numberOfOperators: string;
  operatorsHaveContracts: boolean;
  
  // Vehicle Specific Details
  driveAwaySportsLuxury: boolean;
  sportsLuxuryModels: string;
  towSecondVehicle: boolean;
  busCapacities: {
    under20: string;
    over21: string;
  };
  truckTypes: {
    trucks: string;
    tractors: string;
    tractorTrailers: string;
  };
  truckGVW: {
    gvw0to20k: string;
    gvw20to45k: string;
    gvw45kPlus: string;
  };
  doPiggyback: boolean;
  piggybackPercentage: string;
  piggybackConfig: {
    oneUp: string;
    twoUp: string;
    threeUp: string;
  };
  
  // Submission tracking
  submittedApplicationNumber?: string;
}

const initialData: ApplicationData = {
  companyName: '',
  dba: '',
  businessType: '',
  businessPhone: '',
  mailingStreet: '',
  mailingCity: '',
  mailingState: '',
  mailingZip: '',
  sameAddress: true,
  premisesStreet: '',
  premisesCity: '',
  premisesState: '',
  premisesZip: '',
  contactPerson: '',
  businessDescription: '',
  yearsExperience: '',
  newVenture: false,
  primaryBusiness: true,
  otherBusiness: '',
  grossReceiptsLastYear: '',
  estimatedReceipts: '',
  businessForSale: false,
  bankruptcyHistory: false,
  bankruptcyDate: '',
  bankruptcyExplanation: '',
  multipleStates: false,
  operationStates: '',
  regularRoute: false,
  routeTowns: '',
  liabilityCoverageType: '',
  combinedLimit: '',
  bodilyInjuryPerPerson: '',
  bodilyInjuryPerAccident: '',
  propertyDamage: '',
  medicalPayments: '',
  personalInjuryProtection: '',
  uninsuredMotorist: false,
  underinsuredMotorist: false,
  physicalDamageDesired: false,
  averageVehicleValue: '',
  maximumVehicleValue: '',
  comprehensiveDeductible: '',
  collisionDeductible: '',
  drivers: [],
  minExperienceRequired: '',
  driverPayBasis: '',
  maxDailyHours: '',
  maxWeeklyHours: '',
  workersCompensation: false,
  workersCompCarrier: '',
  takeVehiclesHome: false,
  orderMVRs: false,
  reportNewHires: false,
  hadColumbiaInsurance: false,
  previousPolicyNumbers: '',
  previousEffectiveDates: '',
  priorInsurance: [],
  awareOfClaims: false,
  claimDetails: '',
  declinedInsurance: false,
  declinedReason: '',
  unitTypes: '',
  newUnitsPercentage: '',
  usedUnitsPercentage: '',
  paymentMethod: '',
  ratePerMile: '',
  ratePerTrip: '',
  fullTimeDrivers: '',
  partTimeDrivers: '',
  tripsPerWeek: '',
  maxRadius: '',
  averageRadius: '',
  annualMileage: '',
  pickupLocations: '',
  deliveryLocations: '',
  clientList: '',
  deliverBothWays: false,
  returnTripHandling: '',
  hasOtherOperations: false,
  otherOperations: '',
  maxDailyDrivingHours: '',
  maxWeeklyDrivingHours: '',
  driversAllowedHome: false,
  familyMembersDrive: false,
  requireInsuranceFilings: false,
  filingType: '',
  mcNumber: '',
  returnTripDetails: '',
  deliveryWithTowing: false,
  driversOwnVehicles: false,
  haulAwayVehicles: false,
  towingEquipment: [],
  towingFrequency: '',
  requiredToUsePlates: false,
  useOwnPlatesExclusively: false,
  totalNumberOfPlates: '',
  plateType: '',
  otherPlateType: '',
  platesPerUnit: '',
  averagePlatesInUse: '',
  plateReturnMethod: '',
  plateReturnDays: '',
  plateIdentificationNumbers: '',
  allPlatesInsured: true,
  plateExclusions: '',
  numberOfOperators: '',
  operatorsHaveContracts: false,
  driveAwaySportsLuxury: false,
  sportsLuxuryModels: '',
  towSecondVehicle: false,
  busCapacities: {
    under20: '',
    over21: ''
  },
  truckTypes: {
    trucks: '',
    tractors: '',
    tractorTrailers: ''
  },
  truckGVW: {
    gvw0to20k: '',
    gvw20to45k: '',
    gvw45kPlus: ''
  },
  doPiggyback: false,
  piggybackPercentage: '',
  piggybackConfig: {
    oneUp: '',
    twoUp: '',
    threeUp: ''
  },
  maxDailyDrivingHours: '',
  maxWeeklyDrivingHours: '',
  driversAllowedHome: false,
  familyMembersDrive: false,
  requireInsuranceFilings: false,
  filingType: '',
  mcNumber: '',
  returnTripDetails: '',
  deliveryWithTowing: false,
  driversOwnVehicles: false,
  haulAwayVehicles: false,
  towingEquipment: [],
  towingFrequency: '',
  requiredToUsePlates: false,
  useOwnPlatesExclusively: false,
  totalNumberOfPlates: '',
  plateType: '',
  otherPlateType: '',
  platesPerUnit: '',
  averagePlatesInUse: '',
  plateReturnMethod: '',
  plateReturnDays: '',
  plateIdentificationNumbers: '',
  allPlatesInsured: true,
  plateExclusions: '',
  numberOfOperators: '',
  operatorsHaveContracts: false,
  driveAwaySportsLuxury: false,
  sportsLuxuryModels: '',
  towSecondVehicle: false,
  busCapacities: {
    under20: '',
    over21: ''
  },
  truckTypes: {
    trucks: '',
    tractors: '',
    tractorTrailers: ''
  },
  truckGVW: {
    gvw0to20k: '',
    gvw20to45k: '',
    gvw45kPlus: ''
  },
  doPiggyback: false,
  piggybackPercentage: '',
  piggybackConfig: {
    oneUp: '',
    twoUp: '',
    threeUp: ''
  },
  submittedApplicationNumber: undefined
};

export function useApplicationData() {
  const [applicationData, setApplicationData] = useState<ApplicationData>(() => {
    const saved = localStorage.getItem('driveAwayApplication');
    return saved ? { ...initialData, ...JSON.parse(saved) } : initialData;
  });

  const updateField = useCallback((field: string, value: any) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const resetData = useCallback(() => {
    setApplicationData(initialData);
    localStorage.removeItem('driveAwayApplication');
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('driveAwayApplication', JSON.stringify(applicationData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [applicationData]);

  return {
    applicationData,
    updateField,
    resetData
  };
}