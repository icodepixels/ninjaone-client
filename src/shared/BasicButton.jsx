import PropTypes from 'prop-types';
import SvgIcon from '@/shared/SvgIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  className,
  startIcon,
  endIcon,
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding:
      size === 'small'
        ? '8px 16px'
        : size === 'large'
          ? '16px 32px'
          : '12px 24px',
    border: 'none',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    fontWeight: 500,
    transition: 'all 0.2s ease-in-out',
  };

  const variants = {
    primary: {
      backgroundColor: '#337AB7',
      color: 'white',
      '&:hover': {
        backgroundColor: '#337AB7',
      },
    },
  };

  return (
    <button
      type={type}
      className={`button ${variant} ${size} ${className || ''}`}
      style={{ ...baseStyles, ...variants[variant] }}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && (
        <span className="button-start-icon">
          <SvgIcon name={startIcon} />
        </span>
      )}
      {children}
      {endIcon && <span className="button-end-icon">{endIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outlined']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
};

export default Button;
