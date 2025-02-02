import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import EditDeviceModal from './EditDeviceModal';

// Mock the dependencies
vi.mock('@/shared/SVGIcon', () => ({
  default: () => <div data-testid="svg-icon">Icon</div>,
}));

vi.mock('@/shared/BasicModal', () => ({
  default: ({ children, isOpen }) => (isOpen ? <div>{children}</div> : null),
}));

vi.mock('@/shared/BasicButton', () => ({
  default: ({ children, onClick, type }) => (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  ),
}));

vi.mock('@/shared/BasicSelect', () => ({
  default: ({ value, onChange, id }) => (
    <select data-testid={id} value={value} onChange={onChange}>
      <option value="windows">Windows workstation</option>
      <option value="mac">Mac workstation</option>
      <option value="linux">Linux workstation</option>
    </select>
  ),
}));

const mockDispatch = vi.fn();
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

describe('EditDeviceModal', () => {
  const mockDevice = {
    id: '1',
    system_name: 'Test Device',
    type: 'WINDOWS',
    hdd_capacity: '500',
  };

  const mockStore = configureStore({
    reducer: {
      data: (state = {}) => state,
    },
  });

  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(
      <Provider store={mockStore}>
        <EditDeviceModal
          isOpen={true}
          onClose={mockOnClose}
          device={mockDevice}
        />
      </Provider>
    );

    expect(screen.getByText('Edit device')).toBeInTheDocument();
    expect(screen.getByLabelText('System name *')).toHaveValue('Test Device');
    expect(screen.getByTestId('deviceType')).toHaveValue('windows');
    expect(screen.getByLabelText('HDD capacity (GB) *')).toHaveValue(500);
  });

  it('updates form fields correctly', () => {
    render(
      <Provider store={mockStore}>
        <EditDeviceModal
          isOpen={true}
          onClose={mockOnClose}
          device={mockDevice}
        />
      </Provider>
    );

    const nameInput = screen.getByLabelText('System name *');
    const typeSelect = screen.getByTestId('deviceType');
    const hddInput = screen.getByLabelText('HDD capacity (GB) *');

    fireEvent.change(nameInput, { target: { value: 'New Device Name' } });
    fireEvent.change(typeSelect, { target: { value: 'mac' } });
    fireEvent.change(hddInput, { target: { value: '1000' } });

    expect(nameInput).toHaveValue('New Device Name');
    expect(typeSelect).toHaveValue('mac');
    expect(hddInput).toHaveValue(1000);
  });

  it('calls onClose when cancel button is clicked', () => {
    render(
      <Provider store={mockStore}>
        <EditDeviceModal
          isOpen={true}
          onClose={mockOnClose}
          device={mockDevice}
        />
      </Provider>
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('dispatches updateDevice action on form submission', () => {
    render(
      <Provider store={mockStore}>
        <EditDeviceModal
          isOpen={true}
          onClose={mockOnClose}
          device={mockDevice}
        />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('System name *'), {
      target: { value: 'Updated Device' },
    });
    fireEvent.click(screen.getByText('Save Changes'));

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not submit if required fields are empty', () => {
    render(
      <Provider store={mockStore}>
        <EditDeviceModal
          isOpen={true}
          onClose={mockOnClose}
          device={mockDevice}
        />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('System name *'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByText('Save Changes'));

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
