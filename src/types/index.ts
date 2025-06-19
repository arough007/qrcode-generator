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

export type QRType = 'text' | 'vcard';

export interface ColorOptions {
  foregroundColor: string;
  backgroundColor: string;
  transparentBackground: boolean;
} 