import '@/styles/AppContent.css';
import Button from '@/shared/BasicButton';
import Header from '@/components/Header';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices } from '@/store/actions/dataActions';
import DeviceTable from '@/components/DeviceTable';
import AddDeviceModal from '@/components/AddDeviceModal';
import EditDeviceModal from '@/components/EditDeviceModal';
import DeleteDeviceModal from '@/components/DeleteDeviceModal';
import SVGIcon from '@/shared/SVGIcon';
import BasicSelect from '@/shared/BasicSelect';

function AppContent() {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceTypeFilter, setDeviceTypeFilter] = useState('all');
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

  const filteredData = data
    ?.filter((device) => {
      const matchesType =
        deviceTypeFilter === 'all' ||
        device?.type?.toLowerCase() === deviceTypeFilter?.toLowerCase();
      return matchesType;
    })
    ?.sort((a, b) => {
      // Sort by system_name
      const nameA = a?.system_name?.toLowerCase();
      const nameB = b?.system_name?.toLowerCase();

      // If there's a search term, prioritize matches
      if (searchTerm) {
        const searchTermLower = searchTerm?.toLowerCase();
        const aStartsWith = nameA?.startsWith(searchTermLower);
        const bStartsWith = nameB?.startsWith(searchTermLower);
        const aIncludes = nameA?.includes(searchTermLower);
        const bIncludes = nameB?.includes(searchTermLower);

        // Prioritize exact matches at start
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        // Then prioritize partial matches
        if (aIncludes && !bIncludes) return -1;
        if (!aIncludes && bIncludes) return 1;
      }

      // Sort by HDD capacity first
      const hddA = parseInt(a?.hdd_capacity);
      const hddB = parseInt(b?.hdd_capacity);
      if (sortByHdd === 'desc') {
        if (hddA !== hddB) return hddB - hddA;
      } else {
        if (hddA !== hddB) return hddA - hddB;
      }

      // If HDD capacities are equal, sort by name
      return nameA?.localeCompare(nameB);
    });

  const deviceTypes = data
    ? ['all', ...new Set(data?.map((device) => device?.type?.toLowerCase()))]
    : ['all'];

  const resetFilters = () => {
    setSearchTerm('');
    setDeviceTypeFilter('all');
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
            <BasicSelect
              hidePlaceholder={true}
              value={deviceTypeFilter}
              onChange={(e) => setDeviceTypeFilter(e.target.value)}
              options={deviceTypes.map((type) => ({
                value: type,
                label: `Device Type: ${type === 'all' ? 'All' : type.toUpperCase()}`,
              }))}
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
