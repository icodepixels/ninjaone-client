import '@/styles/AppContent.css';
import Button from '@/shared/BasicButton';
import Header from '@/components/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices } from '@/store/actions/dataActions';
import DeviceTable from '@/components/DeviceTable';

function AppContent() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);

  const handleRowClick = (id) => {
    console.log('Row', id);
  };

  const handleActionButtonClick = (id) => {
    console.log('Action', id);
  };

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="root">
      <Header />
      <div className="container">
        <div className="content">
          <h2>Devices</h2>
          <Button startIcon="Frame397" variant="primary">
            Add device
          </Button>
        </div>
        <div className="devices">
          <DeviceTable
            data={data}
            handleActionButtonClick={handleActionButtonClick}
            handleRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
}

export default AppContent;
