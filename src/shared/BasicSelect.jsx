import PropTypes from 'prop-types';
import SVGIcon from '@/shared/SVGIcon';
import '@/styles/BasicSelect.css';

const BasicSelect = ({
  hidePlaceholder = false,
  id,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  required = false,
}) => {
  return (
    <div className="select-wrapper">
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        style={{ color: value === '' ? '#6E6D7A' : '#211F33' }}
      >
        <option
          value=""
          disabled
          style={{ display: hidePlaceholder ? 'none' : 'block' }}
        >
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <SVGIcon name="Frame400" className="select-icon" width={9} height={14} />
    </div>
  );
};

BasicSelect.propTypes = {
  hidePlaceholder: PropTypes.bool,
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default BasicSelect;
