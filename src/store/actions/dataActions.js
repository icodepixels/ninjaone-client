// Action creators
export const fetchDataStart = () => ({
  type: 'FETCH_DATA_START',
});

export const fetchDataSuccess = (data) => ({
  type: 'FETCH_DATA_SUCCESS',
  payload: data,
});

export const fetchDataError = (error) => ({
  type: 'FETCH_DATA_ERROR',
  payload: error,
});

// Async action creator
export const fetchDevices = () => {
  return async (dispatch) => {
    dispatch(fetchDataStart());

    try {
      const response = await fetch('http://localhost:3000/devices');
      const data = await response.json();
      // Transform the type field in each device to be capitalized
      const transformedData = data.map((device) => ({
        ...device,
        type:
          device.type.charAt(0).toUpperCase() +
          device.type.slice(1).toLowerCase(),
      }));
      dispatch(fetchDataSuccess(transformedData));
    } catch (error) {
      dispatch(fetchDataError(error.message));
    }
  };
};
