import React from 'react';
import { QRSettings as QRSettingsType } from '../types';

interface QRSettingsProps {
  settings: QRSettingsType;
  onSettingsChange: (
    field: keyof QRSettingsType,
    value: string | number
  ) => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

const QRSettings: React.FC<QRSettingsProps> = ({
  settings,
  onSettingsChange,
  isExpanded,
  onToggleExpanded,
}) => {
  return (
    <div className="qr-settings">
      <button
        type="button"
        className="settings-toggle"
        onClick={onToggleExpanded}
        aria-expanded={isExpanded}
      >
        <span>⚙️ Advanced QR Settings</span>
        <span className={`arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </button>

      {isExpanded && (
        <div className="settings-content">
          <div className="form-group">
            <label htmlFor="errorCorrectionLevel">
              Error Correction Level:
            </label>
            <select
              id="errorCorrectionLevel"
              value={settings.errorCorrectionLevel}
              onChange={e =>
                onSettingsChange('errorCorrectionLevel', e.target.value)
              }
            >
              <option value="L">Low (7% damage resistance)</option>
              <option value="M">Medium (15% damage resistance)</option>
              <option value="Q">Quartile (25% damage resistance)</option>
              <option value="H">High (30% damage resistance)</option>
            </select>
            <small className="help-text">
              Higher levels create more complex QR codes but can recover from
              more damage
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="size">QR Code Size:</label>
            <div className="range-input">
              <input
                type="range"
                id="size"
                min="200"
                max="600"
                step="50"
                value={settings.size}
                onChange={e =>
                  onSettingsChange('size', parseInt(e.target.value))
                }
              />
              <span className="range-value">{settings.size}px</span>
            </div>
            <small className="help-text">
              Adjust the output size of the QR code image
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="margin">Margin (Quiet Zone):</label>
            <div className="range-input">
              <input
                type="range"
                id="margin"
                min="0"
                max="4"
                step="1"
                value={settings.margin}
                onChange={e =>
                  onSettingsChange('margin', parseInt(e.target.value))
                }
              />
              <span className="range-value">{settings.margin}</span>
            </div>
            <small className="help-text">
              White space around the QR code (0 = no margin, 4 = large margin)
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="quality">Image Quality:</label>
            <div className="range-input">
              <input
                type="range"
                id="quality"
                min="0.1"
                max="1"
                step="0.1"
                value={settings.quality}
                onChange={e =>
                  onSettingsChange('quality', parseFloat(e.target.value))
                }
              />
              <span className="range-value">
                {Math.round(settings.quality * 100)}%
              </span>
            </div>
            <small className="help-text">
              Higher quality creates larger file sizes but better image clarity
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRSettings;
