import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import QRSettings from '../QRSettings';
import { QRSettings as QRSettingsType } from '../../types';

describe('QRSettings', () => {
  const mockOnSettingsChange = vi.fn();
  const mockOnToggleExpanded = vi.fn();

  const defaultSettings: QRSettingsType = {
    errorCorrectionLevel: 'M',
    size: 300,
    margin: 1,
    quality: 0.9,
  };

  beforeEach(() => {
    mockOnSettingsChange.mockClear();
    mockOnToggleExpanded.mockClear();
  });

  it('renders collapsed by default', () => {
    render(
      <QRSettings
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
        isExpanded={false}
        onToggleExpanded={mockOnToggleExpanded}
      />
    );

    expect(screen.getByText('⚙️ Advanced QR Settings')).toBeInTheDocument();
    expect(
      screen.queryByLabelText('Error Correction Level:')
    ).not.toBeInTheDocument();
  });

  it('renders expanded when isExpanded is true', () => {
    render(
      <QRSettings
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
        isExpanded={true}
        onToggleExpanded={mockOnToggleExpanded}
      />
    );

    expect(
      screen.getByLabelText('Error Correction Level:')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('QR Code Size:')).toBeInTheDocument();
    expect(screen.getByLabelText('Margin (Quiet Zone):')).toBeInTheDocument();
    expect(screen.getByLabelText('Image Quality:')).toBeInTheDocument();
  });

  it('calls onToggleExpanded when toggle button is clicked', () => {
    render(
      <QRSettings
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
        isExpanded={false}
        onToggleExpanded={mockOnToggleExpanded}
      />
    );

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    expect(mockOnToggleExpanded).toHaveBeenCalledTimes(1);
  });

  it('displays current settings values', () => {
    const customSettings: QRSettingsType = {
      errorCorrectionLevel: 'H',
      size: 400,
      margin: 2,
      quality: 0.8,
    };

    render(
      <QRSettings
        settings={customSettings}
        onSettingsChange={mockOnSettingsChange}
        isExpanded={true}
        onToggleExpanded={mockOnToggleExpanded}
      />
    );

    const select = screen.getByLabelText(
      'Error Correction Level:'
    ) as HTMLSelectElement;
    expect(select.value).toBe('H');

    expect(screen.getByDisplayValue('400')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('0.8')).toBeInTheDocument();
  });

  it('calls onSettingsChange when error correction level changes', () => {
    render(
      <QRSettings
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
        isExpanded={true}
        onToggleExpanded={mockOnToggleExpanded}
      />
    );

    const select = screen.getByLabelText('Error Correction Level:');
    fireEvent.change(select, { target: { value: 'H' } });

    expect(mockOnSettingsChange).toHaveBeenCalledWith(
      'errorCorrectionLevel',
      'H'
    );
  });

  it('calls onSettingsChange when size changes', () => {
    render(
      <QRSettings
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
        isExpanded={true}
        onToggleExpanded={mockOnToggleExpanded}
      />
    );

    const sizeSlider = screen.getByLabelText('QR Code Size:');
    fireEvent.change(sizeSlider, { target: { value: '400' } });

    expect(mockOnSettingsChange).toHaveBeenCalledWith('size', 400);
  });

  it('calls onSettingsChange when margin changes', () => {
    render(
      <QRSettings
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
        isExpanded={true}
        onToggleExpanded={mockOnToggleExpanded}
      />
    );

    const marginSlider = screen.getByLabelText('Margin (Quiet Zone):');
    fireEvent.change(marginSlider, { target: { value: '3' } });

    expect(mockOnSettingsChange).toHaveBeenCalledWith('margin', 3);
  });

  it('calls onSettingsChange when quality changes', () => {
    render(
      <QRSettings
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
        isExpanded={true}
        onToggleExpanded={mockOnToggleExpanded}
      />
    );

    const qualitySlider = screen.getByLabelText('Image Quality:');
    fireEvent.change(qualitySlider, { target: { value: '0.7' } });

    expect(mockOnSettingsChange).toHaveBeenCalledWith('quality', 0.7);
  });

  it('shows correct range values', () => {
    render(
      <QRSettings
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
        isExpanded={true}
        onToggleExpanded={mockOnToggleExpanded}
      />
    );

    expect(screen.getByText('300px')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('90%')).toBeInTheDocument(); // 0.9 * 100
  });

  it('shows help text for all settings', () => {
    render(
      <QRSettings
        settings={defaultSettings}
        onSettingsChange={mockOnSettingsChange}
        isExpanded={true}
        onToggleExpanded={mockOnToggleExpanded}
      />
    );

    expect(
      screen.getByText(/Higher levels create more complex QR codes/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Adjust the output size of the QR code/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/White space around the QR code/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Higher quality creates larger file sizes/)
    ).toBeInTheDocument();
  });
});
