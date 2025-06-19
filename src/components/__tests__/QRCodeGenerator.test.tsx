import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import QRCodeGenerator from '../QRCodeGenerator';

// Mock the QR code generation library
vi.mock('qrcode', () => ({
  toCanvas: vi.fn().mockResolvedValue(undefined),
}));

// Mock canvas methods
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: vi.fn(() => ({
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    drawImage: vi.fn(),
  })),
});

Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
  value: vi.fn(callback => {
    callback(new Blob(['fake-blob'], { type: 'image/png' }));
  }),
});

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'fake-url');
global.URL.revokeObjectURL = vi.fn();

describe('QRCodeGenerator', () => {
  it('renders all main components', () => {
    render(<QRCodeGenerator />);

    // Check that main form controls are present
    expect(screen.getByLabelText('QR Code Type:')).toBeInTheDocument();
    expect(screen.getByLabelText('Text or URL to encode:')).toBeInTheDocument();
    expect(screen.getByLabelText('QR Code Color')).toBeInTheDocument();
    expect(screen.getByLabelText('Background Color')).toBeInTheDocument();

    // Check that export options are present
    expect(screen.getByText('Export Format')).toBeInTheDocument();
    expect(screen.getByText('PNG')).toBeInTheDocument();
    expect(screen.getByText('JPEG')).toBeInTheDocument();
    expect(screen.getByText('SVG')).toBeInTheDocument();
    expect(screen.getByText('PDF')).toBeInTheDocument();
    expect(screen.getByText(/Download PNG/)).toBeInTheDocument();
  });

  it('switches between text and vCard modes', async () => {
    const user = userEvent.setup();
    render(<QRCodeGenerator />);

    // Initially should show text input
    expect(screen.getByLabelText('Text or URL to encode:')).toBeInTheDocument();
    expect(screen.queryByLabelText('First Name:')).not.toBeInTheDocument();

    // Switch to vCard mode
    const typeSelector = screen.getByLabelText('QR Code Type:');
    await user.selectOptions(typeSelector, 'vcard');

    // Should now show vCard form
    expect(
      screen.queryByLabelText('Text or URL to encode:')
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
  });

  it('updates text input and maintains state', async () => {
    const user = userEvent.setup();
    render(<QRCodeGenerator />);

    const textInput = screen.getByLabelText('Text or URL to encode:');
    await user.type(textInput, 'Hello World');

    expect(textInput).toHaveValue('Hello World');
  });

  it('updates color controls', async () => {
    const user = userEvent.setup();
    render(<QRCodeGenerator />);

    const foregroundColorInput = screen.getByLabelText('QR Code Color');
    await user.click(foregroundColorInput);
    fireEvent.change(foregroundColorInput, { target: { value: '#ff0000' } });

    expect(foregroundColorInput).toHaveValue('#ff0000');
  });

  it('toggles transparent background and disables background color', async () => {
    const user = userEvent.setup();
    render(<QRCodeGenerator />);

    const backgroundColorInput = screen.getByLabelText('Background Color');
    const transparentCheckbox = screen.getByLabelText(
      'Use transparent background'
    );

    // Initially background color should be enabled
    expect(backgroundColorInput).not.toBeDisabled();

    // Toggle transparent background
    await user.click(transparentCheckbox);

    // Background color input should now be disabled
    expect(backgroundColorInput).toBeDisabled();
  });

  it('shows vCard form fields when in vCard mode', async () => {
    const user = userEvent.setup();
    render(<QRCodeGenerator />);

    // Switch to vCard mode
    const typeSelector = screen.getByLabelText('QR Code Type:');
    await user.selectOptions(typeSelector, 'vcard');

    // Check all vCard fields are present
    expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Organization:')).toBeInTheDocument();
    expect(screen.getByLabelText('Job Title:')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Website:')).toBeInTheDocument();
    expect(screen.getByLabelText('Address:')).toBeInTheDocument();
  });

  it('fills vCard form fields', async () => {
    const user = userEvent.setup();
    render(<QRCodeGenerator />);

    // Switch to vCard mode
    const typeSelector = screen.getByLabelText('QR Code Type:');
    await user.selectOptions(typeSelector, 'vcard');

    // Fill in vCard fields
    await user.type(screen.getByLabelText('First Name:'), 'John');
    await user.type(screen.getByLabelText('Last Name:'), 'Doe');
    await user.type(screen.getByLabelText('Email:'), 'john.doe@example.com');

    expect(screen.getByLabelText('First Name:')).toHaveValue('John');
    expect(screen.getByLabelText('Last Name:')).toHaveValue('Doe');
    expect(screen.getByLabelText('Email:')).toHaveValue('john.doe@example.com');
  });

  it('maintains separate state for text and vCard modes', async () => {
    const user = userEvent.setup();
    render(<QRCodeGenerator />);

    // Enter text in text mode
    const textInput = screen.getByLabelText('Text or URL to encode:');
    await user.type(textInput, 'Test text');

    // Switch to vCard mode and fill fields
    const typeSelector = screen.getByLabelText('QR Code Type:');
    await user.selectOptions(typeSelector, 'vcard');
    await user.type(screen.getByLabelText('First Name:'), 'John');

    // Switch back to text mode
    await user.selectOptions(typeSelector, 'text');

    // Text should still be there
    expect(screen.getByLabelText('Text or URL to encode:')).toHaveValue(
      'Test text'
    );

    // Switch back to vCard mode
    await user.selectOptions(typeSelector, 'vcard');

    // vCard data should still be there
    expect(screen.getByLabelText('First Name:')).toHaveValue('John');
  });
});
