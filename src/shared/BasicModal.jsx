import { useEffect } from 'react';
import PropTypes from 'prop-types';
import '@/styles/BasicModal.css';

const BasicModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    // Prevent scrolling on body when modal is open
    if (isOpen && document?.body) {
      document.body.style.overflow = 'hidden';
    } else if (document?.body) {
      document.body.style.overflow = 'unset';
    }

    return () => {
      if (document?.body) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? 'show' : ''}`}
      onClick={(e) => typeof onClose === 'function' && onClose(e)}
    >
      <div
        className={`modal-content ${isOpen ? 'show' : ''}`}
        onClick={(e) => e?.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

BasicModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicModal;
