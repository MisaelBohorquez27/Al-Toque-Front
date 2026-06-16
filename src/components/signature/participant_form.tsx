import React, { useState } from 'react';
import { User, Mail, Plus } from 'lucide-react';
import type { ParticipantCategory } from '../../types/signature';
import { categories } from '../../data/mock_categories';

interface ParticipantFormProps {
  onAddParticipant: (participant: {
    category: ParticipantCategory;
    name: string;
    email: string;
  }) => void;
}

export const ParticipantForm: React.FC<ParticipantFormProps> = ({ onAddParticipant }) => {
  const [category, setCategory] = useState<ParticipantCategory>('renter');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    onAddParticipant({
      category,
      name: name.trim(),
      email: email.trim(),
    });

    // Reset form
    setName('');
    setEmail('');
    setCategory('renter');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Category Select */}
      <div className="relative">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ParticipantCategory)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none bg-white"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Name Input */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            errors.name ? 'border-red-500' : 'border-gray-200'
          }`}
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email Input */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            errors.email ? 'border-red-500' : 'border-gray-200'
          }`}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Add Button */}
      <button
        type="submit"
        className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add Participant
      </button>
    </form>
  );
};