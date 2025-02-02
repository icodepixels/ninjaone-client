import { useState } from 'react';
import { addDevice } from '../store/actions/dataActions';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import BasicModal from '@/shared/BasicModal';
import SVGIcon from '@/shared/SVGIcon';
import BasicButton from '@/shared/BasicButton';
import BasicSelect from '@/shared/BasicSelect';
import '@/styles/AddDeviceModal.css';

const AddDeviceModal = ({ isOpen, onClose }) => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [hddCapacity, setHDDCapacity] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (!deviceName || !deviceType || !hddCapacity) {
      return;
    }
    e?.preventDefault();
    dispatch(
      addDevice({
        system_name: deviceName,
        type: deviceType,
        hdd_capacity: hddCapacity,
      })
    );
    setDeviceName('');
    setDeviceType('');
    setHDDCapacity('');
    onClose();
  };

  return (
    <BasicModal isOpen={isOpen} onClose={onClose} title="Add New Device">
      <div className="modal-header">
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <SVGIcon name="Frame401" width={18} height={18} />
        </button>
        <h3>Add device</h3>
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
              onChange={(e) => setDeviceType(e?.target?.value)}
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
              onChange={(e) => setHDDCapacity(e?.target?.value)}
              required
            />
          </div>
        </div>
        <div className="modal-actions">
          <BasicButton type="button" onClick={onClose} variant="outlined">
            Cancel
          </BasicButton>
          <BasicButton type="submit" variant="primary">
            Submit
          </BasicButton>
        </div>
      </form>
    </BasicModal>
  );
};

AddDeviceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddDeviceModal;
