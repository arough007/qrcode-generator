// QR Code Types
export type QRType = 'text' | 'vcard';

// VCard field constraints
export type VCardField = 
  | 'firstName' 
  | 'lastName' 
  | 'organization' 
  | 'title' 
  | 'phone' 
  | 'email' 
  | 'website' 
  | 'address';

export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

// Color types with validation
export type HexColor = `#${string}`;

export interface ColorOptions {
  foregroundColor: HexColor;
  backgroundColor: HexColor;
  transparentBackground: boolean;
}

// QR Settings with constraints
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRSizeConstraints {
  min: 200;
  max: 600;
  step: 50;
}

export interface QRMarginConstraints {
  min: 0;
  max: 4;
  step: 1;
}

export interface QRQualityConstraints {
  min: 0.1;
  max: 1.0;
  step: 0.1;
}

export interface QRSettings {
  errorCorrectionLevel: ErrorCorrectionLevel;
  size: number; // Should be between 200-600
  margin: number; // Should be between 0-4
  quality: number; // Should be between 0.1-1.0
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Event handler types
export type VCardChangeHandler = (field: VCardField, value: string) => void;
export type ColorChangeHandler = (field: keyof ColorOptions, value: string | boolean) => void;
export type QRSettingsChangeHandler = (field: keyof QRSettings, value: string | number) => void;

// API response types (for future use)
export interface QRCodeGenerationResult {
  success: boolean;
  dataUrl?: string;
  error?: string;
}

// File download types
export type DownloadFormat = 'png' | 'jpg' | 'svg';

export interface DownloadOptions {
  format: DownloadFormat;
  quality: number;
  filename: string;
}
