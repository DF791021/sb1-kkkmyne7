import { useState, useCallback, useEffect } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  interests: string[];
  notifications: boolean;
  newsletter: boolean;
}

const initialData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  interests: [],
  notifications: true,
  newsletter: false,
};

export function useFormData() {
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = localStorage.getItem('formData');
    return saved ? JSON.parse(saved) : initialData;
  });
  
  const updateField = useCallback((field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);
  
  const clearData = useCallback(() => {
    setFormData(initialData);
    localStorage.removeItem('formData');
  }, []);
  
  // Auto-save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('formData', JSON.stringify(formData));
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [formData]);
  
  return {
    formData,
    updateField,
    clearData
  };
}