import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import MultiSelect from './MultiSelect';

describe('MultiSelect', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders correctly with default props', () => {
    const handleChange = vi.fn();
    render(<MultiSelect options={mockOptions} onChange={handleChange} />);

    expect(screen.getByText('Select options')).toBeInTheDocument();
  });

  it('displays selected values with label', () => {
    const handleChange = vi.fn();
    const label = 'Test Label';
    const values = ['option1', 'option2'];

    render(
      <MultiSelect
        options={mockOptions}
        onChange={handleChange}
        values={values}
        label={label}
      />
    );

    expect(screen.getByText(`${label}: Option 1, Option 2`)).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    const handleChange = vi.fn();
    render(<MultiSelect options={mockOptions} onChange={handleChange} />);

    const placeholder = screen.getByText('Select options');
    fireEvent.click(placeholder);

    // Check if all options are rendered
    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('handles required prop', () => {
    const handleChange = vi.fn();
    render(
      <MultiSelect
        options={mockOptions}
        onChange={handleChange}
        required={true}
      />
    );

    fireEvent.click(screen.getByText('Select options'));
    const select = screen.getByRole('listbox');
    expect(select).toHaveAttribute('required');
  });
});