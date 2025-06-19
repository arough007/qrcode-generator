import React from 'react';
import { ColorOptions } from '../types';

interface ColorControlsProps {
  colors: ColorOptions;
  onColorChange: (field: keyof ColorOptions, value: string | boolean) => void;
}

const ColorControls: React.FC<ColorControlsProps> = ({
  colors,
  onColorChange,
}) => {
  return (
    <div className="color-controls-container">
      <div className="color-controls-header">
        <h3 className="section-title">Color Settings</h3>
      </div>
      
      <div className="color-controls-grid">
        {/* QR Code Color */}
        <div className="color-picker-group">
          <label htmlFor="foregroundColor" className="color-picker-label">
            QR Code Color
          </label>
          <div className="color-picker-wrapper">
            <input
              type="color"
              id="foregroundColor"
              className="color-picker-input"
              value={colors.foregroundColor}
              onChange={e => onColorChange('foregroundColor', e.target.value)}
            />
            <div 
              className="color-picker-preview"
              style={{ backgroundColor: colors.foregroundColor }}
            >
              <span className="color-value">{colors.foregroundColor.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Background Color */}
        <div className="color-picker-group">
          <label htmlFor="backgroundColor" className="color-picker-label">
            Background Color
          </label>
          <div className="color-picker-wrapper">
            <input
              type="color"
              id="backgroundColor"
              className="color-picker-input"
              value={colors.backgroundColor}
              onChange={e => onColorChange('backgroundColor', e.target.value)}
              disabled={colors.transparentBackground}
            />
            <div 
              className={`color-picker-preview ${colors.transparentBackground ? 'disabled' : ''}`}
              style={{ 
                backgroundColor: colors.transparentBackground ? 'transparent' : colors.backgroundColor,
                backgroundImage: colors.transparentBackground ? 
                  'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)' : 'none',
                backgroundSize: colors.transparentBackground ? '12px 12px' : 'auto',
                backgroundPosition: colors.transparentBackground ? '0 0, 0 6px, 6px -6px, -6px 0px' : 'auto'
              }}
            >
              <span className="color-value">
                {colors.transparentBackground ? 'TRANSPARENT' : colors.backgroundColor.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Transparency Toggle */}
      <div className="transparency-control">
        <label className="toggle-switch">
          <input
            type="checkbox"
            className="toggle-input"
            checked={colors.transparentBackground}
            onChange={e => onColorChange('transparentBackground', e.target.checked)}
          />
          <div className="toggle-slider">
            <div className="toggle-handle"></div>
          </div>
          <span className="toggle-label">Use transparent background</span>
        </label>
        <p className="toggle-description">
          Enable this to remove the background color and make the QR code transparent
        </p>
      </div>
    </div>
  );
};

export default ColorControls;
