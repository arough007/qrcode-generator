import { VCardData, VCardField } from '../types';

/**
 * Validates if VCard data has at least one non-empty field
 */
export const hasVCardData = (vcardData: VCardData): boolean => {
  return Object.values(vcardData).some(value => value.trim() !== '');
};

/**
 * Generates a VCard string from VCard data
 */
export const generateVCardString = (vcardData: VCardData): string => {
  const {
    firstName,
    lastName,
    organization,
    title,
    phone,
    email,
    website,
    address,
  } = vcardData;

  let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';

  // Add name (required field)
  const fullName = `${firstName} ${lastName}`.trim();
  if (fullName) {
    vcard += `FN:${fullName}\n`;
    vcard += `N:${lastName};${firstName};;;\n`;
  }

  // Add organization
  if (organization) {
    vcard += `ORG:${organization}\n`;
  }

  // Add title
  if (title) {
    vcard += `TITLE:${title}\n`;
  }

  // Add phone
  if (phone) {
    vcard += `TEL:${phone}\n`;
  }

  // Add email
  if (email) {
    vcard += `EMAIL:${email}\n`;
  }

  // Add website
  if (website) {
    vcard += `URL:${website}\n`;
  }

  // Add address
  if (address) {
    vcard += `ADR:;;${address};;;;\n`;
  }

  vcard += 'END:VCARD';
  return vcard;
};

/**
 * Gets a summary of filled VCard fields for display purposes
 */
export const getVCardSummary = (vcardData: VCardData): string[] => {
  const summary: string[] = [];

  const {
    firstName,
    lastName,
    organization,
    title,
    phone,
    email,
    website,
    address,
  } = vcardData;

  const fullName = `${firstName} ${lastName}`.trim();
  if (fullName) summary.push(`Name: ${fullName}`);
  if (organization) summary.push(`Organization: ${organization}`);
  if (title) summary.push(`Title: ${title}`);
  if (phone) summary.push(`Phone: ${phone}`);
  if (email) summary.push(`Email: ${email}`);
  if (website) summary.push(`Website: ${website}`);
  if (address) summary.push(`Address: ${address}`);

  return summary;
};

/**
 * Basic validation for VCard field formats
 */
export const validateVCardField = (
  field: VCardField,
  value: string
): boolean => {
  switch (field) {
    case 'email':
      return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    case 'website':
      return !value || /^https?:\/\/.+/.test(value);
    case 'phone':
      return !value || /^[\d\s+()-]+$/.test(value);
    default:
      return true;
  }
};
