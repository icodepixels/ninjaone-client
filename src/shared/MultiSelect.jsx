import PropTypes from 'prop-types';
import SVGIcon from '@/shared/SVGIcon';
import '@/styles/MultiSelect.css';
import { useState } from 'react';

const MultiSelect = ({
  id,
  values = [],
  onChange,
  options = [],
  required = false,
  label = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    onChange(selectedOptions);
  };

  const getDisplayText = () => {
    if (values.length === 0) return '';
    const selectedLabels = options
      .filter(option => values.includes(option?.value))
      .map(option => option?.label);
    return `${label}: ${selectedLabels.join(', ')}`;
  };

  return (
    <div className="select-wrapper">
      <div
        className="select-placeholder"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getDisplayText() || 'Select options'}
      </div>
      {isOpen && (
        <select
          id={id}
          multiple
          value={values}
          onChange={handleChange}
          required={required}
          style={{ color: values.length === 0 ? '#6E6D7A' : '#211F33', padding: '0', minHeight: '144px' }}
        >
          {options?.map((option) => (
            <option
              key={option?.value}
              value={option?.value}
              style={{
                backgroundColor: values.includes(option?.value) ? '#ededed' : 'transparent'
              }}
            >
              {option?.label}
            </option>
          ))}
        </select>
      )}
      <SVGIcon name="Frame400" className="select-icon" width={9} height={14} />
    </div>
  );
};

MultiSelect.propTypes = {
  id: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
};

export default MultiSelect;
