import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import TextInput from '../TextInput';

describe('TextInput', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with correct label and placeholder', () => {
    render(<TextInput value="" onChange={mockOnChange} />);

    expect(screen.getByLabelText('Text or URL to encode:')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        'Enter text, URL, or any data you want to encode...'
      )
    ).toBeInTheDocument();
  });

  it('displays the provided value', () => {
    const testValue = 'Hello, World!';
    render(<TextInput value={testValue} onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(testValue);
  });

  it('calls onChange when text is entered', () => {
    render(<TextInput value="" onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New text' } });

    expect(mockOnChange).toHaveBeenCalledWith('New text');
  });

  it('calls onChange multiple times for multiple changes', () => {
    render(<TextInput value="" onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'First' } });
    fireEvent.change(textarea, { target: { value: 'Second' } });

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenNthCalledWith(1, 'First');
    expect(mockOnChange).toHaveBeenNthCalledWith(2, 'Second');
  });
});
