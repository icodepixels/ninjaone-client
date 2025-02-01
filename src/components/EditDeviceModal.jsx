import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateDevice } from '../store/actions/dataActions';
import BasicModal from '@/shared/BasicModal';
import SVGIcon from '@/shared/SVGIcon';
import BasicButton from '@/shared/BasicButton';
import BasicSelect from '@/shared/BasicSelect';
import '@/styles/AddDeviceModal.css';

const EditDeviceModal = ({ isOpen, onClose, device }) => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [hddCapacity, setHDDCapacity] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (device) {
      setDeviceName(device.system_name);
      const normalizedType = device.type.toLowerCase();
      setDeviceType(normalizedType);
      setHDDCapacity(device.hdd_capacity);
    }
  }, [device]);

  const handleSubmit = (e) => {
    if (!deviceName || !deviceType || !hddCapacity) {
      return;
    }
    e.preventDefault();
    dispatch(
      updateDevice({
        id: device.id,
        system_name: deviceName,
        type: deviceType,
        hdd_capacity: hddCapacity,
      })
    );
    onClose();
  };

  return (
    <BasicModal isOpen={isOpen} onClose={onClose} title="Edit Device">
      <div className="modal-header">
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <SVGIcon name="Frame401" width={18} height={18} />
        </button>
        <h3>Edit device</h3>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="deviceName">System name *</label>
            <input
              type="text"
              id="deviceName"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="deviceType">Device type *</label>
            <BasicSelect
              id="deviceType"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              required
              placeholder="Select type"
              options={[
                { value: 'windows', label: 'Windows workstation' },
                { value: 'mac', label: 'Mac workstation' },
                { value: 'linux', label: 'Linux workstation' },
              ]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hddCapacity">HDD capacity (GB) *</label>
            <input
              type="number"
              id="hddCapacity"
              value={hddCapacity}
              onChange={(e) => setHDDCapacity(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="modal-actions">
          <BasicButton type="button" onClick={onClose} variant="outlined">
            Cancel
          </BasicButton>
          <BasicButton type="submit" variant="primary">
            Save Changes
          </BasicButton>
        </div>
      </form>
    </BasicModal>
  );
};

EditDeviceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  device: PropTypes.shape({
    id: PropTypes.string,
    system_name: PropTypes.string,
    type: PropTypes.string,
    hdd_capacity: PropTypes.string,
  }),
};

export default EditDeviceModal;
