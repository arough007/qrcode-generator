import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import QRTypeSelector from '../QRTypeSelector';

describe('QRTypeSelector', () => {
  const mockOnTypeChange = vi.fn();

  beforeEach(() => {
    mockOnTypeChange.mockClear();
  });

  it('renders with correct label and options', () => {
    render(<QRTypeSelector qrType="text" onTypeChange={mockOnTypeChange} />);

    expect(screen.getByLabelText('QR Code Type:')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Text/URL')).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Text/URL' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Contact Card (vCard)' })
    ).toBeInTheDocument();
  });

  it('displays the selected qrType value', () => {
    render(<QRTypeSelector qrType="vcard" onTypeChange={mockOnTypeChange} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('vcard');
  });

  it('calls onTypeChange when selection changes to vcard', () => {
    render(<QRTypeSelector qrType="text" onTypeChange={mockOnTypeChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'vcard' } });

    expect(mockOnTypeChange).toHaveBeenCalledWith('vcard');
  });

  it('calls onTypeChange when selection changes to text', () => {
    render(<QRTypeSelector qrType="vcard" onTypeChange={mockOnTypeChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'text' } });

    expect(mockOnTypeChange).toHaveBeenCalledWith('text');
  });

  it('renders with text selected by default', () => {
    render(<QRTypeSelector qrType="text" onTypeChange={mockOnTypeChange} />);

    const textOption = screen.getByRole('option', {
      name: 'Text/URL',
    }) as HTMLOptionElement;
    const vcardOption = screen.getByRole('option', {
      name: 'Contact Card (vCard)',
    }) as HTMLOptionElement;

    expect(textOption.selected).toBe(true);
    expect(vcardOption.selected).toBe(false);
  });
});
