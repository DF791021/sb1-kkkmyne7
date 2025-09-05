import { useState, useCallback } from 'react';

export function useFormValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePersonalInfo = useCallback((data: any) => {
    const newErrors: Record<string, string> = {};
    
    if (!data.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (data.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!data.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (data.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    
    if (!data.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);
  
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);
  
  return {
    errors,
    validatePersonalInfo,
    clearErrors
  };
}