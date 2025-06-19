import React from 'react';
import { QRType } from '../types';

interface QRTypeSelectorProps {
  qrType: QRType;
  onTypeChange: (type: QRType) => void;
}

const QRTypeSelector: React.FC<QRTypeSelectorProps> = ({
  qrType,
  onTypeChange,
}) => {
  return (
    <div className="form-group">
      <label htmlFor="qrType">QR Code Type:</label>
      <select
        id="qrType"
        value={qrType}
        onChange={e => onTypeChange(e.target.value as QRType)}
      >
        <option value="text">Text/URL</option>
        <option value="vcard">Contact Card (vCard)</option>
      </select>
    </div>
  );
};

export default QRTypeSelector; 