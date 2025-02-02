import { render, screen, fireEvent } from '@testing-library/react';
import BasicSelect from './BasicSelect';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('BasicSelect', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  const defaultProps = {
    id: 'test-select',
    value: '',
    onChange: vi.fn(),
    options: mockOptions,
  };

  beforeEach(() => {
    defaultProps.onChange.mockClear();
  });

  it('renders with default props', () => {
    render(<BasicSelect {...defaultProps} />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders all options correctly', () => {
    render(<BasicSelect {...defaultProps} />);

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('calls onChange when selecting an option', () => {
    render(<BasicSelect {...defaultProps} />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'option1' } });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('hides placeholder when hidePlaceholder is true', () => {
    render(<BasicSelect {...defaultProps} hidePlaceholder={true} />);

    const placeholderOption = screen.queryByText('Select an option');
    expect(placeholderOption).toHaveStyle({ display: 'none' });
  });

  it('displays custom placeholder text', () => {
    const customPlaceholder = 'Custom placeholder';
    render(<BasicSelect {...defaultProps} placeholder={customPlaceholder} />);

    expect(screen.getByText(customPlaceholder)).toBeInTheDocument();
  });

  it('applies required attribute when required prop is true', () => {
    render(<BasicSelect {...defaultProps} required={true} />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveAttribute('required');
  });

  it('changes text color based on value', () => {
    const { rerender } = render(<BasicSelect {...defaultProps} />);
    let selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveStyle({ color: '#6E6D7A' });

    rerender(<BasicSelect {...defaultProps} value="option1" />);
    selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveStyle({ color: '#211F33' });
  });
});
