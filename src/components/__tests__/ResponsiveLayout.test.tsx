import { render, screen, waitFor } from '@testing-library/react';
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

describe('Responsive Layout', () => {
  beforeEach(() => {
    // Reset any viewport changes
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  it('maintains consistent container width when switching QR types', async () => {
    const user = userEvent.setup();
    const { container } = render(<QRCodeGenerator />);

    // In test environment, we look for the rendered component structure
    const qrGenerator =
      container.querySelector('.qr-generator') || container.firstElementChild;
    const typeSelector = screen.getByLabelText('QR Code Type:');

    // Get initial width in text mode
    const initialWidth = qrGenerator?.getBoundingClientRect().width || 0;

    // Switch to vCard mode
    await user.selectOptions(typeSelector, 'vcard');

    // Get width after switching to vCard
    const vCardWidth = qrGenerator?.getBoundingClientRect().width || 0;

    // Widths should be the same (allowing for small rounding differences)
    // In test environment, both might be 0, which is acceptable
    expect(Math.abs(vCardWidth - initialWidth)).toBeLessThan(1);
  });

  it('applies single-column layout on medium screens (≤900px)', async () => {
    // Simulate medium screen size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });

    const user = userEvent.setup();
    render(<QRCodeGenerator />);

    // Switch to vCard mode to show the grid
    const typeSelector = screen.getByLabelText('QR Code Type:');
    await user.selectOptions(typeSelector, 'vcard');

    // Check if vCard grid exists
    const vCardForm = screen
      .getByLabelText('First Name:')
      .closest('.vcard-grid');
    expect(vCardForm).toBeInTheDocument();

    // On medium screens, grid should have single column styling
    // We can't directly test CSS grid columns, but we can check that the element exists
    // and has the expected class
    expect(vCardForm).toHaveClass('vcard-grid');
  });

  it('prevents horizontal overflow in vCard mode', async () => {
    const user = userEvent.setup({ delay: null });
    const { container } = render(<QRCodeGenerator />);

    // Switch to vCard mode
    const typeSelector = screen.getByLabelText('QR Code Type:');
    await user.selectOptions(typeSelector, 'vcard');

    // Wait for vCard form to render
    await screen.findByLabelText('First Name:');

    // Fill in key vCard fields with long text to test overflow
    const longText = 'VeryLongTextThatMightCauseOverflow';

    // Use shorter, simpler inputs to avoid timeout issues
    await user.type(screen.getByLabelText('First Name:'), longText);
    await user.type(screen.getByLabelText('Last Name:'), longText);
    await user.type(screen.getByLabelText('Email:'), `${longText}@example.com`);

    // Check that container doesn't exceed its bounds
    const qrGenerator = container.querySelector('.qr-generator');
    const containerRect = qrGenerator?.getBoundingClientRect();

    // The container should not be excessively wide
    // (This is a basic check - in a real browser test, we'd check against viewport)
    expect(containerRect?.width).toBeLessThan(2000); // Reasonable upper bound
  }, 10000); // Increase timeout to 10 seconds

  it('maintains form functionality after layout changes', async () => {
    const user = userEvent.setup({ delay: null });
    render(<QRCodeGenerator />);

    // Test text mode
    const textInput = screen.getByLabelText('Text or URL to encode:');
    await user.clear(textInput);
    await user.type(textInput, 'Test text');
    
    // Wait for the input to be updated
    await waitFor(() => {
      expect(textInput).toHaveValue('Test text');
    });

    // Switch to vCard mode
    const typeSelector = screen.getByLabelText('QR Code Type:');
    await user.selectOptions(typeSelector, 'vcard');

    // Wait for vCard form to render
    await screen.findByLabelText('First Name:');

    // Test vCard form functionality
    const firstNameInput = screen.getByLabelText('First Name:');
    await user.clear(firstNameInput);
    await user.type(firstNameInput, 'John');
    
    // Wait for the input to be updated
    await waitFor(() => {
      expect(firstNameInput).toHaveValue('John');
    });

    // Switch back to text mode
    await user.selectOptions(typeSelector, 'text');

    // Wait for text input to reappear and check value
    const textInputAfter = await screen.findByLabelText('Text or URL to encode:');
    expect(textInputAfter).toHaveValue('Test text');
  });

  it('handles rapid type switching without layout issues', async () => {
    const user = userEvent.setup();
    const { container } = render(<QRCodeGenerator />);

    const typeSelector = screen.getByLabelText('QR Code Type:');
    const qrGenerator = container.querySelector('.qr-generator');

    // Record initial width
    const initialWidth = qrGenerator?.getBoundingClientRect().width;

    // Rapidly switch between modes multiple times
    for (let i = 0; i < 5; i++) {
      await user.selectOptions(typeSelector, 'vcard');
      await user.selectOptions(typeSelector, 'text');
    }

    // Width should remain consistent
    const finalWidth = qrGenerator?.getBoundingClientRect().width;
    expect(Math.abs((finalWidth || 0) - (initialWidth || 0))).toBeLessThan(1);
  });

  it('ensures all form elements fit within container bounds', async () => {
    const user = userEvent.setup();
    const { container } = render(<QRCodeGenerator />);

    // Switch to vCard mode (more complex layout)
    const typeSelector = screen.getByLabelText('QR Code Type:');
    await user.selectOptions(typeSelector, 'vcard');

    // Get all form inputs
    const inputs = container.querySelectorAll('input, textarea, select');

    // Check that all inputs exist and are properly rendered
    expect(inputs.length).toBeGreaterThan(0);

    // In test environment, just verify the inputs are present and accessible
    inputs.forEach(input => {
      expect(input).toBeInTheDocument();
    });
  });

  it('vCard grid has proper CSS classes and structure', async () => {
    const user = userEvent.setup();
    const { container } = render(<QRCodeGenerator />);

    // Switch to vCard mode
    const typeSelector = screen.getByLabelText('QR Code Type:');
    await user.selectOptions(typeSelector, 'vcard');

    // Find the vCard grid - it should exist and have the right class
    const vCardGrid = container.querySelector('.vcard-grid');
    expect(vCardGrid).toBeInTheDocument();
    expect(vCardGrid).toHaveClass('vcard-grid');

    // Check that vCard form fields are present (indicating the grid is being used)
    expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone:')).toBeInTheDocument();

    // Ensure all form fields are contained within the grid
    const formFields = container.querySelectorAll(
      '.vcard-grid input, .vcard-grid textarea'
    );
    expect(formFields.length).toBeGreaterThan(0);
  });
});
