import PropTypes from 'prop-types';
import SVGIcon from '@/shared/SVGIcon';

const DeviceTableRow = ({ row, handleActionButtonClick, handleRowClick }) => {
  return (
    <tr key={row.id} className="first-column-content">
      <td onClick={() => handleRowClick(row.id)}>
        <div className="device-row-content">
          <div className="title">
            <SVGIcon
              name={
                row.type.toLowerCase() === 'windows'
                  ? 'Frame394'
                  : row.type.toLowerCase() === 'linux'
                    ? 'Frame395'
                    : row.type.toLowerCase() === 'mac'
                      ? 'Frame396'
                      : 'Frame395'
              }
            />
            {row.system_name}
          </div>
          <div className="sub-content">
            <div className="subtitle">
              <span>{row.type}</span> workstation
            </div>{' '}
            - <div className="subtitle">{row.hdd_capacity} GB</div>
          </div>
        </div>
      </td>
      <td
        className="action-column"
        onClick={() => handleActionButtonClick(row.id)}
      >
        <SVGIcon name="Frame402" className="action-button" />
      </td>
    </tr>
  );
};

DeviceTableRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    system_name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    hdd_capacity: PropTypes.string.isRequired,
  }).isRequired,
  handleRowClick: PropTypes.func.isRequired,
  handleActionButtonClick: PropTypes.func.isRequired,
};

export default DeviceTableRow;
