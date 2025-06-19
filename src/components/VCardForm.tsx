import React from 'react';
import { VCardData } from '../types';

interface VCardFormProps {
  vcardData: VCardData;
  onDataChange: (field: keyof VCardData, value: string) => void;
}

const VCardForm: React.FC<VCardFormProps> = ({ vcardData, onDataChange }) => {
  return (
    <div className="form-group">
      <div className="vcard-grid">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={vcardData.firstName}
            onChange={e => onDataChange('firstName', e.target.value)}
            placeholder="John"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={vcardData.lastName}
            onChange={e => onDataChange('lastName', e.target.value)}
            placeholder="Doe"
          />
        </div>
        <div className="form-group">
          <label htmlFor="organization">Organization:</label>
          <input
            type="text"
            id="organization"
            value={vcardData.organization}
            onChange={e => onDataChange('organization', e.target.value)}
            placeholder="Company Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Job Title:</label>
          <input
            type="text"
            id="title"
            value={vcardData.title}
            onChange={e => onDataChange('title', e.target.value)}
            placeholder="Software Engineer"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={vcardData.phone}
            onChange={e => onDataChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={vcardData.email}
            onChange={e => onDataChange('email', e.target.value)}
            placeholder="john@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website:</label>
          <input
            type="url"
            id="website"
            value={vcardData.website}
            onChange={e => onDataChange('website', e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={vcardData.address}
            onChange={e => onDataChange('address', e.target.value)}
            placeholder="123 Main St, City, State 12345"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default VCardForm; 