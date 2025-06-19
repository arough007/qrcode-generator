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
    <>
      <div className="color-controls">
        <div className="color-group">
          <label htmlFor="foregroundColor">QR Code Color:</label>
          <input
            type="color"
            id="foregroundColor"
            value={colors.foregroundColor}
            onChange={e => onColorChange('foregroundColor', e.target.value)}
          />
        </div>
        <div className="color-group">
          <label htmlFor="backgroundColor">Background Color:</label>
          <input
            type="color"
            id="backgroundColor"
            value={colors.backgroundColor}
            onChange={e => onColorChange('backgroundColor', e.target.value)}
            disabled={colors.transparentBackground}
          />
        </div>
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="transparentBackground"
          checked={colors.transparentBackground}
          onChange={e => onColorChange('transparentBackground', e.target.checked)}
        />
        <label htmlFor="transparentBackground">
          Use transparent background
        </label>
      </div>
    </>
  );
};

export default ColorControls; 