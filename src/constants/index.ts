import { VCardData, ColorOptions, QRSettings } from '../types';

// QR Settings Default Values
export const QR_SETTINGS_DEFAULTS: QRSettings = {
  errorCorrectionLevel: 'M',
  size: 300,
  margin: 1,
  quality: 0.92,
};

// QR Size Configuration
export const QR_SIZE_LIMITS = {
  min: 200,
  max: 600,
  step: 50,
} as const;

// QR Margin Configuration
export const QR_MARGIN_LIMITS = {
  min: 0,
  max: 4,
  step: 1,
} as const;

// QR Quality Configuration
export const QR_QUALITY_LIMITS = {
  min: 0.1,
  max: 1.0,
  step: 0.1,
} as const;

// VCard Default Values
export const VCARD_DEFAULTS: VCardData = {
  firstName: '',
  lastName: '',
  organization: '',
  title: '',
  phone: '',
  email: '',
  website: '',
  address: '',
};

// Color Default Values
export const COLOR_DEFAULTS: ColorOptions = {
  foregroundColor: '#000000',
  backgroundColor: '#ffffff',
  transparentBackground: false,
};

// Timing Constants
export const DEBOUNCE_DELAY = 500;

// QR Code Generation Constants
export const QR_SCALE_FACTOR = 37.5; // For size calculation

// Error Messages
export const ERROR_MESSAGES = {
  NO_VCARD_DATA:
    'Please fill in at least one contact field before downloading.',
  NO_TEXT_DATA: 'Please enter some text before downloading.',
  NO_QR_CODE:
    'No QR code available to download. Please generate a QR code first.',
  DOWNLOAD_FAILED: 'Failed to download QR code. Please try again.',
} as const;
