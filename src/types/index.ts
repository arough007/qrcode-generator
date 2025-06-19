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

// Color types
export type HexColor = `#${string}`;

export interface ColorOptions {
  foregroundColor: HexColor;
  backgroundColor: HexColor;
  transparentBackground: boolean;
}

// QR Settings
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRSettings {
  errorCorrectionLevel: ErrorCorrectionLevel;
  size: number; // 200-600
  margin: number; // 0-4
  quality: number; // 0.1-1.0
}

// Event handler types
export type VCardChangeHandler = (field: VCardField, value: string) => void;
export type ColorChangeHandler = (
  field: keyof ColorOptions,
  value: string | boolean
) => void;
export type QRSettingsChangeHandler = (
  field: keyof QRSettings,
  value: string | number
) => void;

// API response types (for future use)
export interface QRCodeGenerationResult {
  success: boolean;
  dataUrl?: string;
  error?: string;
}

// File download types
export type DownloadFormat = 'png' | 'jpg' | 'jpeg' | 'svg' | 'pdf';

export interface DownloadOptions {
  format: DownloadFormat;
  quality: number;
  filename: string;
}
