import PropTypes from 'prop-types';
import SvgIcon from '@/shared/SvgIcon';
import '@/styles/BasicButton.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'small',
  disabled = false,
  onClick,
  type = 'button',
  className,
  startIcon,
  endIcon,
}) => {
  return (
    <button
      type={type}
      className={`button ${variant} ${size} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && (
        <span className="button-start-icon">
          <SvgIcon name={startIcon} width={14} height={14} />
        </span>
      )}
      {children}
      {endIcon && <span className="button-end-icon">{endIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['danger', 'primary', 'outlined', 'icon']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
};

export default Button;
