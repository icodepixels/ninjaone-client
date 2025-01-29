import '@/styles/DeviceTable.css';
import PropTypes from 'prop-types';
import DeviceTableRow from '@/components/DeviceTableRow';

const DeviceTable = ({ data, handleActionButtonClick, handleRowClick }) => {
  return (
    <div className="table-container">
      <table className="device-table">
        <thead>
          <tr>
            <th>Device</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <DeviceTableRow
              key={row.id}
              row={row}
              handleRowClick={handleRowClick}
              handleActionButtonClick={handleActionButtonClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

DeviceTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      system_name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      hdd_capacity: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleRowClick: PropTypes.func.isRequired,
  handleActionButtonClick: PropTypes.func.isRequired,
};

export default DeviceTable;
