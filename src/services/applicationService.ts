import { supabase } from '../lib/supabase';
import type { ApplicationSubmission } from '../lib/supabase';

export class ApplicationService {
  static async submitApplication(data: any): Promise<{ success: boolean; applicationNumber?: string; error?: string }> {
    try {
      // Transform form data to database structure
      const applicationData = this.transformFormData(data);
      
      // Insert main application
      const { data: application, error: appError } = await supabase
        .from('applications')
        .insert({
          company_name: applicationData.companyName,
          dba: applicationData.dba,
          business_type: applicationData.businessType,
          business_phone: applicationData.businessPhone,
          mailing_address: applicationData.mailingAddress,
          premises_address: applicationData.premisesAddress,
          same_address: applicationData.sameAddress,
          contact_person: applicationData.contactPerson,
          business_description: applicationData.businessDescription,
          years_experience: applicationData.yearsExperience,
          new_venture: applicationData.newVenture,
          primary_business: applicationData.primaryBusiness,
          other_business: applicationData.otherBusiness,
          gross_receipts_last_year: applicationData.grossReceiptsLastYear,
          estimated_receipts: applicationData.estimatedReceipts,
          business_for_sale: applicationData.businessForSale,
          bankruptcy_history: applicationData.bankruptcyHistory,
          bankruptcy_details: applicationData.bankruptcyDetails,
          operation_details: applicationData.operationDetails,
          liability_coverage: applicationData.liabilityCoverage,
          additional_coverage: applicationData.additionalCoverage,
          physical_damage_coverage: applicationData.physicalDamageCoverage,
          driver_requirements: applicationData.driverRequirements,
          columbia_insurance_history: applicationData.columbiaInsuranceHistory,
          disclosure_questions: applicationData.disclosureQuestions,
          drive_away_operations: applicationData.driveAwayOperations,
          additional_operations: applicationData.additionalOperations,
          plate_information: applicationData.plateInformation,
          vehicle_specific_details: applicationData.vehicleSpecificDetails
        })
        .select('id, application_number')
        .single();

      if (appError) {
        console.error('Application submission error:', appError);
        return { success: false, error: 'Failed to submit application. Please try again.' };
      }

      // Insert drivers
      if (data.drivers && data.drivers.length > 0) {
        const drivers = data.drivers.map((driver: any) => ({
          application_id: application.id,
          driver_name: driver.name || '',
          date_of_birth: driver.dateOfBirth || null,
          license_state: driver.licenseState || '',
          license_number: driver.licenseNumber || '',
          license_class: driver.licenseClass || '',
          years_licensed: parseInt(driver.yearsLicensed) || 0,
          commercial_experience_years: parseInt(driver.experienceYears) || null,
          employee_type: driver.employeeType || null,
          accidents: driver.accidents ? [{ description: driver.accidents }] : [],
          violations: driver.violations ? [{ description: driver.violations }] : [],
          major_convictions: driver.convictions ? [{ description: driver.convictions }] : []
        }));

        const { error: driversError } = await supabase
          .from('drivers')
          .insert(drivers);

        if (driversError) {
          console.error('Drivers insertion error:', driversError);
        }
      }

      // Insert prior insurance records
      if (data.priorInsurance && data.priorInsurance.length > 0) {
        const insuranceRecords = data.priorInsurance.map((record: any) => ({
          application_id: application.id,
          carrier_name: record.carrierName || '',
          policy_term_from: null, // Parse from record.policyTerm if needed
          policy_term_to: null,
          number_of_vehicles: parseInt(record.vehicles) || 0,
          number_of_accidents: parseInt(record.accidents) || 0,
          premium_liability: record.premium || '',
          claims_paid: record.claimsPaid || ''
        }));

        const { error: insuranceError } = await supabase
          .from('prior_insurance')
          .insert(insuranceRecords);

        if (insuranceError) {
          console.error('Prior insurance insertion error:', insuranceError);
        }
      }

      // Log submission attempt
      const { error: submissionError } = await supabase
        .from('application_submissions')
        .insert({
          application_id: application.id,
          submission_data: data,
          email_sent: false
        });

      if (submissionError) {
        console.error('Submission logging error:', submissionError);
      }

      // Send confirmation email
      await this.sendConfirmationEmail(application.application_number, data);

      return { 
        success: true, 
        applicationNumber: application.application_number 
      };

    } catch (error) {
      console.error('Unexpected error during submission:', error);
      return { 
        success: false, 
        error: 'An unexpected error occurred. Please try again or contact support.' 
      };
    }
  }

  private static transformFormData(data: any): ApplicationSubmission {
    return {
      companyName: data.companyName || '',
      dba: data.dba,
      businessType: data.businessType || '',
      businessPhone: data.businessPhone || '',
      mailingAddress: {
        street: data.mailingStreet || '',
        city: data.mailingCity || '',
        state: data.mailingState || '',
        zip: data.mailingZip || ''
      },
      premisesAddress: data.sameAddress ? undefined : {
        street: data.premisesStreet || '',
        city: data.premisesCity || '',
        state: data.premisesState || '',
        zip: data.premisesZip || ''
      },
      sameAddress: data.sameAddress || true,
      contactPerson: data.contactPerson || '',
      businessDescription: data.businessDescription || '',
      yearsExperience: parseInt(data.yearsExperience) || 0,
      newVenture: data.newVenture || false,
      primaryBusiness: data.primaryBusiness ?? true,
      otherBusiness: data.otherBusiness,
      grossReceiptsLastYear: data.grossReceiptsLastYear,
      estimatedReceipts: data.estimatedReceipts,
      businessForSale: data.businessForSale || false,
      bankruptcyHistory: data.bankruptcyHistory || false,
      bankruptcyDetails: data.bankruptcyHistory ? {
        date: data.bankruptcyDate || '',
        explanation: data.bankruptcyExplanation || ''
      } : undefined,
      operationDetails: {
        multipleStates: data.multipleStates || false,
        operationStates: data.operationStates,
        regularRoute: data.regularRoute || false,
        routeTowns: data.routeTowns
      },
      liabilityCoverage: {
        coverageType: data.liabilityCoverageType || '',
        combinedLimit: data.combinedLimit,
        splitLimits: data.liabilityCoverageType === 'split' ? {
          bodilyInjuryPerPerson: data.bodilyInjuryPerPerson || '',
          bodilyInjuryPerAccident: data.bodilyInjuryPerAccident || '',
          propertyDamage: data.propertyDamage || ''
        } : undefined
      },
      additionalCoverage: {
        medicalPayments: data.medicalPayments,
        personalInjuryProtection: data.personalInjuryProtection,
        uninsuredMotorist: data.uninsuredMotorist || false,
        underinsuredMotorist: data.underinsuredMotorist || false
      },
      physicalDamageCoverage: {
        desired: data.physicalDamageDesired || false,
        averageVehicleValue: data.averageVehicleValue,
        maximumVehicleValue: data.maximumVehicleValue,
        comprehensiveDeductible: data.comprehensiveDeductible,
        collisionDeductible: data.collisionDeductible
      },
      driverRequirements: {
        minExperienceRequired: data.minExperienceRequired,
        driverPayBasis: data.driverPayBasis,
        maxDailyHours: data.maxDailyHours,
        maxWeeklyHours: data.maxWeeklyHours,
        workersCompensation: data.workersCompensation || false,
        workersCompCarrier: data.workersCompCarrier,
        takeVehiclesHome: data.takeVehiclesHome || false,
        orderMVRs: data.orderMVRs || false,
        reportNewHires: data.reportNewHires || false
      },
      columbiaInsuranceHistory: {
        hadPrevious: data.hadColumbiaInsurance || false,
        policyNumbers: data.previousPolicyNumbers,
        effectiveDates: data.previousEffectiveDates
      },
      disclosureQuestions: {
        awareOfClaims: data.awareOfClaims || false,
        claimDetails: data.claimDetails,
        declinedInsurance: data.declinedInsurance || false,
        declinedReason: data.declinedReason
      },
      driveAwayOperations: {
        unitTypes: data.unitTypes || '',
        newUnitsPercentage: data.newUnitsPercentage,
        usedUnitsPercentage: data.usedUnitsPercentage,
        paymentMethod: data.paymentMethod || '',
        ratePerMile: data.ratePerMile,
        ratePerTrip: data.ratePerTrip,
        fullTimeDrivers: data.fullTimeDrivers,
        partTimeDrivers: data.partTimeDrivers,
        tripsPerWeek: data.tripsPerWeek,
        maxRadius: data.maxRadius,
        averageRadius: data.averageRadius,
        annualMileage: data.annualMileage,
        pickupLocations: data.pickupLocations || '',
        deliveryLocations: data.deliveryLocations || '',
        clientList: data.clientList,
        deliverBothWays: data.deliverBothWays || false,
        returnTripHandling: data.returnTripHandling,
        hasOtherOperations: data.hasOtherOperations || false,
        otherOperations: data.otherOperations
      },
      additionalOperations: {
        maxDailyDrivingHours: data.maxDailyDrivingHours,
        maxWeeklyDrivingHours: data.maxWeeklyDrivingHours,
        driversAllowedHome: data.driversAllowedHome || false,
        familyMembersDrive: data.familyMembersDrive || false,
        requireInsuranceFilings: data.requireInsuranceFilings || false,
        filingType: data.filingType,
        mcNumber: data.mcNumber,
        returnTripDetails: data.returnTripDetails,
        deliveryWithTowing: data.deliveryWithTowing || false,
        driversOwnVehicles: data.driversOwnVehicles || false,
        haulAwayVehicles: data.haulAwayVehicles || false,
        towingEquipment: data.towingEquipment || [],
        towingFrequency: data.towingFrequency
      },
      plateInformation: {
        requiredToUsePlates: data.requiredToUsePlates || false,
        useOwnPlatesExclusively: data.useOwnPlatesExclusively || false,
        totalNumberOfPlates: data.totalNumberOfPlates,
        plateType: data.plateType,
        otherPlateType: data.otherPlateType,
        platesPerUnit: data.platesPerUnit,
        averagePlatesInUse: data.averagePlatesInUse,
        plateReturnMethod: data.plateReturnMethod,
        plateReturnDays: data.plateReturnDays,
        plateIdentificationNumbers: data.plateIdentificationNumbers,
        allPlatesInsured: data.allPlatesInsured ?? true,
        plateExclusions: data.plateExclusions,
        numberOfOperators: data.numberOfOperators,
        operatorsHaveContracts: data.operatorsHaveContracts || false
      },
      vehicleSpecificDetails: {
        driveAwaySportsLuxury: data.driveAwaySportsLuxury || false,
        sportsLuxuryModels: data.sportsLuxuryModels,
        towSecondVehicle: data.towSecondVehicle || false,
        busCapacities: {
          under20: data.busCapacities?.under20,
          over21: data.busCapacities?.over21
        },
        truckTypes: {
          trucks: data.truckTypes?.trucks,
          tractors: data.truckTypes?.tractors,
          tractorTrailers: data.truckTypes?.tractorTrailers
        },
        truckGVW: {
          gvw0to20k: data.truckGVW?.gvw0to20k,
          gvw20to45k: data.truckGVW?.gvw20to45k,
          gvw45kPlus: data.truckGVW?.gvw45kPlus
        },
        doPiggyback: data.doPiggyback || false,
        piggybackPercentage: data.piggybackPercentage,
        piggybackConfig: {
          oneUp: data.piggybackConfig?.oneUp,
          twoUp: data.piggybackConfig?.twoUp,
          threeUp: data.piggybackConfig?.threeUp
        }
      }
    };
  }

  private static async sendConfirmationEmail(applicationNumber: string, data: any): Promise<void> {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-confirmation-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicationNumber,
          companyName: data.companyName,
          contactPerson: data.contactPerson,
          businessPhone: data.businessPhone
        })
      });

      if (!response.ok) {
        console.error('Failed to send confirmation email');
      }
    } catch (error) {
      console.error('Email service error:', error);
    }
  }
}