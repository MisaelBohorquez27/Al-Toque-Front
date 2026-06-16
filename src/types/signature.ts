export type ParticipantCategory = 'owner' | 'renter' | 'spouse' | 'guarantor';

export interface CategoryOption {
  value: ParticipantCategory;
  label: string;
  icon: string;
  color: string;
}

export interface Participant {
  id: string;
  category: ParticipantCategory;
  name: string;
  email: string;
}

export interface ContractFile {
  file: File;
  name: string;
  size: number;
}