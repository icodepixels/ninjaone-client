import '@/styles/AppContent.css';
import Button from '@/shared/BasicButton';
import Header from '@/components/Header';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices } from '@/store/actions/dataActions';
import DeviceTable from '@/components/DeviceTable';
import AddDeviceModal from '@/components/AddDeviceModal';
import EditDeviceModal from '@/components/EditDeviceModal';
import DeleteDeviceModal from '@/components/DeleteDeviceModal';
import SVGIcon from '@/shared/SVGIcon';
import BasicSelect from '@/shared/BasicSelect';
import MultiSelect from '@/shared/MultiSelect';

function AppContent() {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceTypeFilter, setDeviceTypeFilter] = useState(['all']);
  const [sortByHdd, setSortByHdd] = useState('desc');

  const handleActionButtonClick = (id, action) => {
    if (action === 'edit') {
      setSelectedDevice(data?.find((device) => device?.id === id));
      setIsEditModalOpen(true);
    } else if (action === 'delete') {
      setSelectedDevice(data?.find((device) => device?.id === id));
      setIsDeleteModalOpen(true);
    }
  };

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data
      .filter((device) => {
        if (!device) return false;
        if (deviceTypeFilter.includes('all') || deviceTypeFilter.length === 0) {
          return true;
        }
        return device.type && deviceTypeFilter.includes(device.type.toLowerCase());
      })
      .sort((a, b) => {
        if (!a || !b) return 0;

        const nameA = a.system_name?.toLowerCase() || '';
        const nameB = b.system_name?.toLowerCase() || '';

        if (searchTerm) {
          const searchTermLower = searchTerm.toLowerCase();
          const aStartsWith = nameA.startsWith(searchTermLower);
          const bStartsWith = nameB.startsWith(searchTermLower);
          const aIncludes = nameA.includes(searchTermLower);
          const bIncludes = nameB.includes(searchTermLower);

          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          if (aIncludes && !bIncludes) return -1;
          if (!aIncludes && bIncludes) return 1;
        }

        const hddA = parseInt(a.hdd_capacity) || 0;
        const hddB = parseInt(b.hdd_capacity) || 0;

        const hddCompare = sortByHdd === 'desc' ? hddB - hddA : hddA - hddB;
        return hddCompare || nameA.localeCompare(nameB);
      });
  }, [data, deviceTypeFilter, searchTerm, sortByHdd]);

  const deviceTypes = useMemo(() => {
    if (!data) return ['all'];
    const types = new Set(data
      .filter(device => device?.type)
      .map(device => device.type.toLowerCase())
    );
    return ['all', ...types];
  }, [data]);

  const resetFilters = () => {
    setSearchTerm('');
    setDeviceTypeFilter(['all']);
    setSortByHdd('desc');
  };

  if (error) return <div>Error: {error}</div>;
  return (
    <div className="main">
      <Header />
      <div className="container">
        <div className="content">
          <h2>Devices</h2>
          <Button
            startIcon="Frame397"
            onClick={() => setIsModalOpen(true)}
            variant="primary"
          >
            Add device
          </Button>
        </div>
        <div className="devices">
          <div className="controls">
            <div className="search-wrapper">
              <span className="search-icon">
                <SVGIcon name="Frame398" width={20} height={20} />
              </span>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <MultiSelect
              hidePlaceholder={true}
              label="Device Type"
              value={deviceTypeFilter}
              onChange={(selected) => {
                let updatedFilter;
                const selectedOption = selected?.[0];

                if (selectedOption === 'all') {
                  // If 'all' is selected, make it the only option
                  updatedFilter = ['all'];
                } else {
                  // Remove 'all' if it exists and toggle the selected option
                  const filterWithoutAll = deviceTypeFilter.filter(type => type !== 'all');
                  updatedFilter = filterWithoutAll.includes(selectedOption)
                    ? filterWithoutAll.filter(type => type !== selectedOption)
                    : [...filterWithoutAll, selectedOption];

                  // If no options are selected, default back to 'all'
                  if (updatedFilter.length === 0) {
                    updatedFilter = ['all'];
                  }
                }

                setDeviceTypeFilter(updatedFilter);
              }}
              options={deviceTypes.map((type) => ({
                value: type,
                label: `${type === 'all' ? 'All' : type.toUpperCase()}`,
              }))}
              multiple={true}
              values={deviceTypeFilter}
            />
            <BasicSelect
              hidePlaceholder={true}
              value={sortByHdd}
              onChange={(e) => setSortByHdd(e.target.value)}
              options={[
                { value: 'desc', label: 'HDD Capacity: (Descending)' },
                { value: 'asc', label: 'HDD Capacity: (Ascending)' },
              ]}
            />
            <Button
              onClick={resetFilters}
              className="reset-filters-button"
              variant="icon"
            >
              <SVGIcon name="Frame399" />
            </Button>
          </div>
          <DeviceTable
            data={filteredData}
            handleActionButtonClick={handleActionButtonClick}
          />
        </div>
      </div>
      <AddDeviceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <EditDeviceModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        device={selectedDevice}
      />
      <DeleteDeviceModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        device={selectedDevice}
      />
    </div>
  );
}

export default AppContent;
