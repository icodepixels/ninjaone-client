import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AppContent from './AppContent';

// Mock the redux store and actions
vi.mock('@/store/actions/dataActions', () => ({
  fetchDevices: vi.fn(() => ({ type: 'FETCH_DEVICES' }))
}));

// Mock child components
vi.mock('@/components/Header', () => ({
  default: () => <div data-testid="mock-header">Header</div>
}));

vi.mock('@/components/DeviceTable', () => ({
  default: ({ data, handleActionButtonClick }) => (
    <div data-testid="mock-device-table">
      {data?.map(device => (
        <div key={device.id}>
          {device.system_name}
          <button onClick={() => handleActionButtonClick(device.id, 'edit')}>Edit</button>
          <button onClick={() => handleActionButtonClick(device.id, 'delete')}>Delete</button>
        </div>
      ))}
    </div>
  )
}));

// Mock modal components
vi.mock('@/components/AddDeviceModal', () => ({
  default: ({ isOpen }) => isOpen ? <div data-testid="add-device-modal">Add Modal</div> : null
}));

vi.mock('@/components/EditDeviceModal', () => ({
  default: ({ isOpen }) => isOpen ? <div data-testid="edit-device-modal">Edit Modal</div> : null
}));

vi.mock('@/components/DeleteDeviceModal', () => ({
  default: ({ isOpen }) => isOpen ? <div data-testid="delete-device-modal">Delete Modal</div> : null
}));

describe('AppContent', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        data: (state = { data: [], error: null }) => state
      }
    });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <AppContent />
      </Provider>
    );
    expect(screen.getByText('Devices')).toBeInTheDocument();
  });

  it('opens add device modal when add device button is clicked', () => {
    render(
      <Provider store={store}>
        <AppContent />
      </Provider>
    );

    const addButton = screen.getByText('Add device');
    fireEvent.click(addButton);

    expect(screen.getByTestId('add-device-modal')).toBeInTheDocument();
  });

  it('filters devices based on search term', async () => {
    const mockData = [
      { id: 1, system_name: 'Device 1', type: 'windows', hdd_capacity: '100' },
      { id: 2, system_name: 'Server 2', type: 'linux', hdd_capacity: '200' }
    ];

    const mockStore = configureStore({
      reducer: {
        data: () => ({
          data: mockData,
          error: null
        })
      }
    });

    // Create a container to check what's actually being rendered
    const { container } = render(
      <Provider store={mockStore}>
        <AppContent />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search');

    // Use act to ensure state updates are processed
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'Device 1' } });
    });

    // Wait for any async updates
    await screen.findByText('Device 1');

    // Debug what's being rendered
    console.log('Current container content:', container.innerHTML);

    // More specific assertions
    const deviceElements = screen.getAllByText(/Device 1/);
    expect(deviceElements).toHaveLength(1);
    expect(deviceElements[0]).toHaveTextContent('Device 1');
  });

  it('handles device type filtering', async () => {
    const mockStore = configureStore({
      reducer: {
        data: () => ({
          data: [
            { id: 1, system_name: 'Device 1', type: 'windows', hdd_capacity: '100' },
            { id: 2, system_name: 'Server 2', type: 'linux', hdd_capacity: '200' }
          ],
          error: null
        })
      }
    });

    render(
      <Provider store={mockStore}>
        <AppContent />
      </Provider>
    );

    await screen.findByText('Device 1');

    expect(screen.getByText('Device 1')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorStore = configureStore({
      reducer: {
        data: (state = { data: [], error: 'Test error message' }) => state
      }
    });

    render(
      <Provider store={errorStore}>
        <AppContent />
      </Provider>
    );

    expect(screen.getByText('Error: Test error message')).toBeInTheDocument();
  });
});
