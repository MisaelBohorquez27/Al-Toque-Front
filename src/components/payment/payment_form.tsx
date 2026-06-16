import React from 'react';
import { CreditCard, User, Lock } from 'lucide-react';
import type { PaymentFormData } from '../../types/payment';

interface PaymentFormProps {
  formData: PaymentFormData;
  errors: Partial<PaymentFormData>;
  saveCard: boolean;
  onSaveCardChange: (value: boolean) => void;
  onChange: (field: keyof PaymentFormData, value: string) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  formData,
  errors,
  saveCard,
  onSaveCardChange,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-lg font-extrabold text-gray-900 tracking-tight mb-5">
        Card Details
      </h3>

      <div className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Card Number
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => onChange('cardNumber', e.target.value)}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-200'
              }`}
            />
          </div>
          {errors.cardNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
          )}
        </div>

        {/* Card Holder */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Cardholder Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="John Doe"
              value={formData.cardHolder}
              onChange={(e) => onChange('cardHolder', e.target.value)}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                errors.cardHolder ? 'border-red-500' : 'border-gray-200'
              }`}
            />
          </div>
          {errors.cardHolder && (
            <p className="text-xs text-red-500 mt-1">{errors.cardHolder}</p>
          )}
        </div>

        {/* Expiry Date & CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Expiry Date
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={(e) => onChange('expiryDate', e.target.value)}
              className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                errors.expiryDate ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.expiryDate && (
              <p className="text-xs text-red-500 mt-1">{errors.expiryDate}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              CVV
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="password"
                placeholder="123"
                maxLength={4}
                value={formData.cvv}
                onChange={(e) => onChange('cvv', e.target.value)}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                  errors.cvv ? 'border-red-500' : 'border-gray-200'
                }`}
              />
            </div>
            {errors.cvv && (
              <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Save Card Checkbox */}
        <label className="flex items-center gap-2 cursor-pointer mt-2">
          <input
            type="checkbox"
            checked={saveCard}
            onChange={(e) => onSaveCardChange(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
          />
          <span className="text-sm text-gray-600">Save card for future payments</span>
        </label>
      </div>
    </div>
  );
};