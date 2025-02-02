import PropTypes from 'prop-types';
import SVGIcon from '@/shared/SVGIcon';
import { useEffect } from 'react';

const DeviceTableRow = ({ row, handleActionButtonClick }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.action-column')) {
        document.querySelectorAll('.dropdown-menu.show').forEach((menu) => {
          menu.classList.remove('show');
        });
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <tr key={row?.id} className="first-column-content">
      <td>
        <div className="device-row-content">
          <div className="title">
            <SVGIcon
              name={
                row?.type?.toLowerCase() === 'windows'
                  ? 'Frame394'
                  : row?.type?.toLowerCase() === 'linux'
                    ? 'Frame395'
                    : row?.type?.toLowerCase() === 'mac'
                      ? 'Frame396'
                      : 'Frame395'
              }
            />
            <span className="title-text">{row?.system_name}</span>
          </div>
          <div className="sub-content">
            <div className="subtitle">
              <span className="subtitle-text">
                {row?.type?.charAt(0)?.toUpperCase() +
                  row?.type?.slice(1)?.toLowerCase()}
              </span>{' '}
              workstation
            </div>{' '}
            - <div className="subtitle">{row?.hdd_capacity} GB</div>
          </div>
        </div>
      </td>
      <td
        className="action-column"
        onClick={(e) => {
          e.stopPropagation();
          document.querySelectorAll('.dropdown-menu.show').forEach((menu) => {
            if (menu !== e.currentTarget.querySelector('.dropdown-menu')) {
              menu.classList.remove('show');
            }
          });
          e.currentTarget
            .querySelector('.dropdown-menu')
            .classList.toggle('show');
        }}
      >
        <div className="dropdown">
          <SVGIcon name="Frame402" className="action-button" />
          <div className="dropdown-menu">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleActionButtonClick(row?.id, 'edit');
                e.currentTarget
                  .closest('.dropdown-menu')
                  .classList.remove('show');
              }}
              className="dropdown-item"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleActionButtonClick(row?.id, 'delete');
                e.currentTarget
                  .closest('.dropdown-menu')
                  .classList.remove('show');
              }}
              className="dropdown-item delete"
            >
              Delete
            </button>
          </div>
        </div>
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
  handleActionButtonClick: PropTypes.func.isRequired,
};

export default DeviceTableRow;
