import '@/styles/DeleteDeviceModal.css';
import BasicModal from '@/shared/BasicModal';
import Button from '@/shared/BasicButton';
import { useDispatch } from 'react-redux';
import { deleteDevice } from '@/store/actions/dataActions';
import PropTypes from 'prop-types';
import SVGIcon from '@/shared/SVGIcon';

function DeleteDeviceModal({ isOpen, onClose, device }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (device?.id) {
      dispatch(deleteDevice(device.id));
      onClose();
    }
  };

  return (
    <BasicModal isOpen={isOpen} onClose={onClose} title="Delete Device">
      <div className="modal-header">
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <SVGIcon name="Frame401" width={18} height={18} />
        </button>
        <h3>Delete device?</h3>
      </div>
      <div className="delete-modal-content">
        <p className="delete-modal-content-text">
          You are about to delete the device{' '}
          <span className="delete-modal-content-text-device-name">
            {device?.system_name?.toUpperCase()}
          </span>
          . This action cannot be undone.
        </p>

        <div className="modal-actions">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="danger">
            Delete
          </Button>
        </div>
      </div>
    </BasicModal>
  );
}

DeleteDeviceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  device: PropTypes.shape({
    id: PropTypes.string.isRequired,
    system_name: PropTypes.string.isRequired,
  }),
};

export default DeleteDeviceModal;
