import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ProgressIndicator } from './components/ProgressIndicator';
import { Navigation } from './components/Navigation';
import { CompanyInfoStep } from './components/steps/CompanyInfoStep';
import { BusinessOperationsStep } from './components/steps/BusinessOperationsStep';
import { CoverageSelectionStep } from './components/steps/CoverageSelectionStep';
import { DriverInformationStep } from './components/steps/DriverInformationStep';
import { LossHistoryStep } from './components/steps/LossHistoryStep';
import { DriveAwayDetailsStep } from './components/steps/DriveAwayDetailsStep';
import { AdditionalOperationsStep } from './components/steps/AdditionalOperationsStep';
import { PlateInformationStep } from './components/steps/PlateInformationStep';
import { VehicleSpecificDetailsStep } from './components/steps/VehicleSpecificDetailsStep';
import { ReviewStep } from './components/steps/ReviewStep';
import { SuccessStep } from './components/steps/SuccessStep';
import { useApplicationData } from './hooks/useApplicationData';
import { useValidation } from './hooks/useValidation';
import { ApplicationService } from './services/applicationService';

const FORM_STEPS = [
  { id: 'company-info', title: 'Company Information', description: 'Basic company details and contact information' },
  { id: 'business-operations', title: 'Business Operations', description: 'Details about your business operations' },
  { id: 'coverage-selection', title: 'Coverage Selection', description: 'Choose your insurance coverage options' },
  { id: 'driver-information', title: 'Driver Information', description: 'Add information for all drivers' },
  { id: 'loss-history', title: 'Insurance History', description: 'Previous insurance and loss history' },
  { id: 'drive-away-details', title: 'Drive-Away Operations', description: 'Specific drive-away operation details' },
  { id: 'additional-operations', title: 'Additional Operations', description: 'Additional operational requirements' },
  { id: 'plate-information', title: 'Plate Information', description: 'Vehicle plate details and requirements' },
  { id: 'vehicle-details', title: 'Vehicle Specific Details', description: 'Specific vehicle type information' },
  { id: 'review', title: 'Review & Submit', description: 'Review your application before submission' }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    applicationNumber?: string;
    error?: string;
  } | null>(null);
  
  const { applicationData, updateField, resetData } = useApplicationData();
  const { errors, validateStep, clearErrors } = useValidation();

  const canProceed = useCallback(() => {
    if (currentStep === FORM_STEPS.length - 1) return true; // Review step
    return validateStep(currentStep, applicationData, false);
  }, [currentStep, applicationData, validateStep]);

  const handleNext = useCallback(() => {
    if (validateStep(currentStep, applicationData, true)) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => Math.min(prev + 1, FORM_STEPS.length - 1));
      clearErrors();
      window.scrollTo(0, 0);
    }
  }, [currentStep, applicationData, validateStep, clearErrors]);

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    clearErrors();
    window.scrollTo(0, 0);
  }, [clearErrors]);

  const handleStepClick = useCallback((stepIndex: number) => {
    if (stepIndex <= currentStep || completedSteps.has(stepIndex)) {
      setCurrentStep(stepIndex);
      clearErrors();
      window.scrollTo(0, 0);
    }
  }, [currentStep, completedSteps, clearErrors]);

  const handleSubmit = useCallback(async () => {
    if (!validateStep(currentStep, applicationData, true)) return;
    
    setIsSubmitting(true);
    try {
      const result = await ApplicationService.submitApplication(applicationData);
      setSubmissionResult(result);
      
      if (result.success) {
        updateField('submittedApplicationNumber', result.applicationNumber);
        setCurrentStep(FORM_STEPS.length); // Move to success step
      }
    } catch (error) {
      setSubmissionResult({
        success: false,
        error: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [currentStep, applicationData, validateStep, updateField]);

  const handleStartNew = useCallback(() => {
    resetData();
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setSubmissionResult(null);
    clearErrors();
    window.scrollTo(0, 0);
  }, [resetData, clearErrors]);

  const renderCurrentStep = () => {
    // Success step (after form completion)
    if (currentStep === FORM_STEPS.length) {
      return (
        <SuccessStep 
          applicationNumber={submissionResult?.applicationNumber}
          onStartNew={handleStartNew}
        />
      );
    }

    const commonProps = {
      data: applicationData,
      onChange: updateField,
      errors
    };

    switch (currentStep) {
      case 0:
        return <CompanyInfoStep {...commonProps} />;
      case 1:
        return <BusinessOperationsStep {...commonProps} />;
      case 2:
        return <CoverageSelectionStep {...commonProps} />;
      case 3:
        return <DriverInformationStep {...commonProps} />;
      case 4:
        return <LossHistoryStep {...commonProps} />;
      case 5:
        return <DriveAwayDetailsStep {...commonProps} />;
      case 6:
        return <AdditionalOperationsStep {...commonProps} />;
      case 7:
        return <PlateInformationStep {...commonProps} />;
      case 8:
        return <VehicleSpecificDetailsStep {...commonProps} />;
      case 9:
        return <ReviewStep data={applicationData} />;
      default:
        return <CompanyInfoStep {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {currentStep < FORM_STEPS.length && (
            <ProgressIndicator
              steps={FORM_STEPS}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
            />
          )}
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 md:p-12 mb-8">
            {renderCurrentStep()}
            
            {currentStep < FORM_STEPS.length && (
              <Navigation
                currentStep={currentStep}
                totalSteps={FORM_STEPS.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmit}
                canProceed={canProceed()}
                isLoading={isSubmitting}
              />
            )}
          </div>

          {/* Security and trust indicators */}
          <div className="text-center text-sm text-gray-600 space-y-2">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Data Protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>GDPR Compliant</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              © 2024 GreenLite Insurance Agency. All information is transmitted securely and stored confidentially.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}