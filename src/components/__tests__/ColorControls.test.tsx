import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ColorControls from '../ColorControls';
import { ColorOptions } from '../../types';

describe('ColorControls', () => {
  const mockOnColorChange = vi.fn();

  const defaultColors: ColorOptions = {
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    transparentBackground: false,
  };

  beforeEach(() => {
    mockOnColorChange.mockClear();
  });

  it('renders all color controls with correct labels', () => {
    render(
      <ColorControls colors={defaultColors} onColorChange={mockOnColorChange} />
    );

    expect(screen.getByLabelText('QR Code Color')).toBeInTheDocument();
    expect(screen.getByLabelText('Background Color')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Use transparent background')
    ).toBeInTheDocument();
  });

  it('displays current color values', () => {
    const customColors: ColorOptions = {
      foregroundColor: '#ff0000',
      backgroundColor: '#00ff00',
      transparentBackground: false,
    };

    render(
      <ColorControls colors={customColors} onColorChange={mockOnColorChange} />
    );

    const foregroundInput = screen.getByLabelText(
      'QR Code Color'
    ) as HTMLInputElement;
    const backgroundInput = screen.getByLabelText(
      'Background Color'
    ) as HTMLInputElement;

    expect(foregroundInput.value).toBe('#ff0000');
    expect(backgroundInput.value).toBe('#00ff00');
  });

  it('calls onColorChange when foreground color changes', () => {
    render(
      <ColorControls colors={defaultColors} onColorChange={mockOnColorChange} />
    );

    const foregroundInput = screen.getByLabelText('QR Code Color');
    fireEvent.change(foregroundInput, { target: { value: '#ff0000' } });

    expect(mockOnColorChange).toHaveBeenCalledWith(
      'foregroundColor',
      '#ff0000'
    );
  });

  it('calls onColorChange when background color changes', () => {
    render(
      <ColorControls colors={defaultColors} onColorChange={mockOnColorChange} />
    );

    const backgroundInput = screen.getByLabelText('Background Color');
    fireEvent.change(backgroundInput, { target: { value: '#00ff00' } });

    expect(mockOnColorChange).toHaveBeenCalledWith(
      'backgroundColor',
      '#00ff00'
    );
  });

  it('calls onColorChange when transparent background checkbox is toggled', () => {
    render(
      <ColorControls colors={defaultColors} onColorChange={mockOnColorChange} />
    );

    const checkbox = screen.getByLabelText('Use transparent background');
    fireEvent.click(checkbox);

    expect(mockOnColorChange).toHaveBeenCalledWith(
      'transparentBackground',
      true
    );
  });

  it('disables background color input when transparent background is enabled', () => {
    const transparentColors: ColorOptions = {
      ...defaultColors,
      transparentBackground: true,
    };

    render(
      <ColorControls
        colors={transparentColors}
        onColorChange={mockOnColorChange}
      />
    );

    const backgroundInput = screen.getByLabelText('Background Color');
    expect(backgroundInput).toBeDisabled();
  });

  it('enables background color input when transparent background is disabled', () => {
    render(
      <ColorControls colors={defaultColors} onColorChange={mockOnColorChange} />
    );

    const backgroundInput = screen.getByLabelText('Background Color');
    expect(backgroundInput).not.toBeDisabled();
  });

  it('shows checkbox as checked when transparentBackground is true', () => {
    const transparentColors: ColorOptions = {
      ...defaultColors,
      transparentBackground: true,
    };

    render(
      <ColorControls
        colors={transparentColors}
        onColorChange={mockOnColorChange}
      />
    );

    const checkbox = screen.getByLabelText(
      'Use transparent background'
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });
});
