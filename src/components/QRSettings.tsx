import React from 'react';
import { QRSettings as QRSettingsType } from '../types';
import {
  QR_SIZE_LIMITS,
  QR_MARGIN_LIMITS,
  QR_QUALITY_LIMITS,
} from '../constants';
import { useModalFocus } from '../hooks/useModalFocus';

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
  // Use the modal focus management hook
  const { modalRef } = useModalFocus({
    isOpen: isExpanded,
    onClose: onToggleExpanded,
  });

  return (
    <div className="qr-settings">
      <button
        type="button"
        className="settings-toggle"
        onClick={onToggleExpanded}
        aria-expanded={isExpanded}
      >
        <span>⚙️ Advanced QR Settings</span>
      </button>

      {isExpanded && (
        <>
          <div className="settings-modal-overlay" onClick={onToggleExpanded} />
          <div
            className="settings-modal"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-modal-title"
            tabIndex={-1}
          >
            <div className="settings-modal-header">
              <h3 id="settings-modal-title">Advanced QR Settings</h3>
              <button
                type="button"
                className="settings-close-btn"
                onClick={onToggleExpanded}
                aria-label="Close settings"
              >
                ✕
              </button>
            </div>

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
                  Higher levels create more complex QR codes but can recover
                  from more damage
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="size">QR Code Size:</label>
                <div className="range-input">
                  <input
                    type="range"
                    id="size"
                    min={QR_SIZE_LIMITS.min}
                    max={QR_SIZE_LIMITS.max}
                    step={QR_SIZE_LIMITS.step}
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
                    min={QR_MARGIN_LIMITS.min}
                    max={QR_MARGIN_LIMITS.max}
                    step={QR_MARGIN_LIMITS.step}
                    value={settings.margin}
                    onChange={e =>
                      onSettingsChange('margin', parseInt(e.target.value))
                    }
                  />
                  <span className="range-value">{settings.margin}</span>
                </div>
                <small className="help-text">
                  White space around the QR code (0 = no margin, 4 = large
                  margin)
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="quality">Image Quality:</label>
                <div className="range-input">
                  <input
                    type="range"
                    id="quality"
                    min={QR_QUALITY_LIMITS.min}
                    max={QR_QUALITY_LIMITS.max}
                    step={QR_QUALITY_LIMITS.step}
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
                  Higher quality creates larger file sizes but better image
                  clarity
                </small>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QRSettings;
