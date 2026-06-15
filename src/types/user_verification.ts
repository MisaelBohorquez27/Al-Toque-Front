export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface UserVerification {
  id: string;
  name: string;
  email: string;
  cedula: string;
  phone: string;
  status: VerificationStatus;
  submittedDate: string;
  documentType: string;
  documentNumber: string;
}

export interface StatData {
  label: string;
  value: string;
  color: string;
}