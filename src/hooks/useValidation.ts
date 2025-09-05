import { useState, useCallback } from 'react';

export function useValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateStep = useCallback((step: number, data: any, showErrors: boolean = true) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0: // Company Info
        if (!data.companyName?.trim()) {
          newErrors.companyName = 'Company name is required';
        }
        if (!data.businessType) {
          newErrors.businessType = 'Business type is required';
        }
        if (!data.businessPhone?.trim()) {
          newErrors.businessPhone = 'Business phone is required';
        } else if (!validatePhone(data.businessPhone)) {
          newErrors.businessPhone = 'Please enter a valid phone number';
        }
        if (!data.mailingStreet?.trim()) {
          newErrors.mailingStreet = 'Mailing address is required';
        }
        if (!data.mailingCity?.trim()) {
          newErrors.mailingCity = 'City is required';
        }
        if (!data.mailingState) {
          newErrors.mailingState = 'State is required';
        }
        if (!data.mailingZip?.trim()) {
          newErrors.mailingZip = 'ZIP code is required';
        }
        if (!data.contactPerson?.trim()) {
          newErrors.contactPerson = 'Contact person is required';
        }
        break;

      case 1: // Business Operations
        if (!data.businessDescription?.trim()) {
          newErrors.businessDescription = 'Business description is required';
        }
        if (!data.yearsExperience) {
          newErrors.yearsExperience = 'Years of experience is required';
        }
        if (data.bankruptcyHistory && !data.bankruptcyDate?.trim()) {
          newErrors.bankruptcyDate = 'Bankruptcy date is required';
        }
        if (data.bankruptcyHistory && !data.bankruptcyExplanation?.trim()) {
          newErrors.bankruptcyExplanation = 'Explanation is required';
        }
        break;

      case 2: // Coverage
        if (!data.liabilityCoverageType) {
          newErrors.liabilityCoverageType = 'Liability coverage type is required';
        }
        if (data.liabilityCoverageType === 'combined' && !data.combinedLimit) {
          newErrors.combinedLimit = 'Combined limit is required';
        }
        if (data.liabilityCoverageType === 'split') {
          if (!data.bodilyInjuryPerPerson) {
            newErrors.bodilyInjuryPerPerson = 'Required for split limits';
          }
          if (!data.bodilyInjuryPerAccident) {
            newErrors.bodilyInjuryPerAccident = 'Required for split limits';
          }
          if (!data.propertyDamage) {
            newErrors.propertyDamage = 'Required for split limits';
          }
        }
        break;

      case 3: // Drivers
        if (!data.drivers || data.drivers.length === 0) {
          newErrors.drivers = 'At least one driver is required';
        } else {
          data.drivers.forEach((driver: any, index: number) => {
            if (!driver.name?.trim()) {
              newErrors[`driver-${driver.id}-name`] = 'Driver name is required';
            }
            if (!driver.dateOfBirth) {
              newErrors[`driver-${driver.id}-dob`] = 'Date of birth is required';
            }
            if (!driver.licenseState) {
              newErrors[`driver-${driver.id}-state`] = 'License state is required';
            }
            if (!driver.licenseNumber?.trim()) {
              newErrors[`driver-${driver.id}-license`] = 'License number is required';
            }
            if (!driver.yearsLicensed) {
              newErrors[`driver-${driver.id}-years`] = 'Years licensed is required';
            }
          });
        }
        break;

      case 4: // Loss History
        if (data.awareOfClaims && !data.claimDetails?.trim()) {
          newErrors.claimDetails = 'Please provide details about potential claims';
        }
        if (data.declinedInsurance && !data.declinedReason?.trim()) {
          newErrors.declinedReason = 'Please provide date and reason';
        }
        break;

      case 5: // Drive-Away Details
        if (!data.unitTypes?.trim()) {
          newErrors.unitTypes = 'Types of units is required';
        }
        if (!data.paymentMethod) {
          newErrors.paymentMethod = 'Payment method is required';
        }
        if (!data.pickupLocations?.trim()) {
          newErrors.pickupLocations = 'Pickup locations are required';
        }
        if (!data.deliveryLocations?.trim()) {
          newErrors.deliveryLocations = 'Delivery locations are required';
        }
        if (data.hasOtherOperations && !data.otherOperations?.trim()) {
          newErrors.otherOperations = 'Please describe other operations';
        }
        break;

      case 6: // Additional Operations
        if (data.requireInsuranceFilings && data.filingType === 'fhwa' && !data.mcNumber?.trim()) {
          newErrors.mcNumber = 'MC number is required for FHWA filing';
        }
        break;

      case 7: // Plate Information
        if (data.requiredToUsePlates) {
          if (!data.totalNumberOfPlates?.trim()) {
            newErrors.totalNumberOfPlates = 'Total number of plates is required';
          }
          if (!data.plateType) {
            newErrors.plateType = 'Plate type is required';
          }
          if (data.plateType === 'other' && !data.otherPlateType?.trim()) {
            newErrors.otherPlateType = 'Please specify the plate type';
          }
          if (!data.allPlatesInsured && !data.plateExclusions?.trim()) {
            newErrors.plateExclusions = 'Please explain which plates are not covered';
          }
        }
        break;

      case 8: // Vehicle Specific Details
        if (data.driveAwaySportsLuxury && !data.sportsLuxuryModels?.trim()) {
          newErrors.sportsLuxuryModels = 'Please list the luxury/sports vehicle models';
        }
        if (data.doPiggyback && !data.piggybackPercentage?.trim()) {
          newErrors.piggybackPercentage = 'Piggyback percentage is required';
        }
        // Validate percentage totals
        if (data.busCapacities?.under20 || data.busCapacities?.over21) {
          const busTotal = (parseInt(data.busCapacities?.under20) || 0) + (parseInt(data.busCapacities?.over21) || 0);
          if (busTotal !== 100 && busTotal !== 0) {
            newErrors.busUnder20 = 'Bus capacity percentages must total 100%';
          }
        }
        if (data.truckTypes?.trucks || data.truckTypes?.tractors || data.truckTypes?.tractorTrailers) {
          const truckTotal = (parseInt(data.truckTypes?.trucks) || 0) + (parseInt(data.truckTypes?.tractors) || 0) + (parseInt(data.truckTypes?.tractorTrailers) || 0);
          if (truckTotal !== 100 && truckTotal !== 0) {
            newErrors.truckPercentage = 'Truck type percentages must total 100%';
          }
        }
        break;

      case 6: // Additional Operations
        if (data.requireInsuranceFilings && data.filingType === 'fhwa' && !data.mcNumber?.trim()) {
          newErrors.mcNumber = 'MC number is required for FHWA filing';
        }
        if (data.requiredToUsePlates && !data.totalNumberOfPlates?.trim()) {
          newErrors.totalNumberOfPlates = 'Total number of plates is required';
        }
        if (data.requiredToUsePlates && !data.plateType) {
          newErrors.plateType = 'Plate type is required';
        }
        if (data.plateType === 'other' && !data.otherPlateType?.trim()) {
          newErrors.otherPlateType = 'Please specify the plate type';
        }
        break;

      case 7: // Plate Information
        if (data.requiredToUsePlates) {
          if (!data.platesPerUnit?.trim()) {
            newErrors.platesPerUnit = 'Number of plates per unit is required';
          }
          if (!data.averagePlatesInUse?.trim()) {
            newErrors.averagePlatesInUse = 'Average plates in use is required';
          }
          if (!data.allPlatesInsured && !data.plateExclusions?.trim()) {
            newErrors.plateExclusions = 'Please explain which plates are not covered';
          }
        }
        break;

      case 8: // Vehicle Specific Details
        if (data.driveAwaySportsLuxury && !data.sportsLuxuryModels?.trim()) {
          newErrors.sportsLuxuryModels = 'Please list the luxury/sports vehicle models';
        }
        if (data.doPiggyback && !data.piggybackPercentage?.trim()) {
          newErrors.piggybackPercentage = 'Piggyback percentage is required';
        }
        // Validate percentage totals
        if (data.busCapacities?.under20 || data.busCapacities?.over21) {
          const busTotal = (parseInt(data.busCapacities?.under20) || 0) + (parseInt(data.busCapacities?.over21) || 0);
          if (busTotal !== 100 && busTotal !== 0) {
            newErrors.busUnder20 = 'Bus capacity percentages must total 100%';
          }
        }
        if (data.truckTypes?.trucks || data.truckTypes?.tractors || data.truckTypes?.tractorTrailers) {
          const truckTotal = (parseInt(data.truckTypes?.trucks) || 0) + (parseInt(data.truckTypes?.tractors) || 0) + (parseInt(data.truckTypes?.tractorTrailers) || 0);
          if (truckTotal !== 100 && truckTotal !== 0) {
            newErrors.truckPercentage = 'Truck type percentages must total 100%';
          }
        }
        break;
    }

    if (showErrors) {
      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateStep,
    clearErrors
  };
}