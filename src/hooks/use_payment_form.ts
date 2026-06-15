import { useState, useCallback } from 'react';
import type { PaymentFormData } from '../types/payment';

export const usePaymentForm = () => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});
  const [saveCard, setSaveCard] = useState(false);

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = [];
    for (let i = 0; i < cleaned.length; i += 4) {
      chunks.push(cleaned.slice(i, i + 4));
    }
    return chunks.join(' ');
  };

  const formatExpiryDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const validateCardNumber = (value: string): string | undefined => {
    const cleaned = value.replace(/\s/g, '');
    if (!cleaned) return 'Card number is required';
    if (cleaned.length < 16) return 'Enter a valid 16-digit card number';
    return undefined;
  };

  const validateCardHolder = (value: string): string | undefined => {
    if (!value) return 'Cardholder name is required';
    if (value.length < 3) return 'Enter a valid name';
    return undefined;
  };

  const validateExpiryDate = (value: string): string | undefined => {
    if (!value) return 'Expiry date is required';
    if (value.length < 5) return 'Use format MM/YY';
    return undefined;
  };

  const validateCVV = (value: string): string | undefined => {
    if (!value) return 'CVV is required';
    if (value.length < 3) return 'Enter a valid CVV';
    return undefined;
  };

  const handleChange = useCallback((field: keyof PaymentFormData, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<PaymentFormData> = {};
    
    newErrors.cardNumber = validateCardNumber(formData.cardNumber);
    newErrors.cardHolder = validateCardHolder(formData.cardHolder);
    newErrors.expiryDate = validateExpiryDate(formData.expiryDate);
    newErrors.cvv = validateCVV(formData.cvv);
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== undefined);
  }, [formData]);

  return {
    formData,
    errors,
    saveCard,
    setSaveCard,
    handleChange,
    validateForm,
  };
};