export interface UploadedFile {
  file: File;
  name: string;
  url: string;
}

export type VerificationStep = 1 | 2 | 3 | 4;