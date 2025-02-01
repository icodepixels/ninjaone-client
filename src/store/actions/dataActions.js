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

export const postDataStart = () => ({
  type: 'POST_DATA_START',
});

export const postDataSuccess = (data) => ({
  type: 'POST_DATA_SUCCESS',
  payload: data,
});

export const postDataError = (error) => ({
  type: 'POST_DATA_ERROR',
  payload: error,
});

export const putDataStart = () => ({
  type: 'UPDATE_DATA_START',
});

export const putDataSuccess = (data) => ({
  type: 'UPDATE_DATA_SUCCESS',
  payload: data,
});

export const putDataError = (error) => ({
  type: 'UPDATE_DATA_ERROR',
  payload: error,
});

export const deleteDataSuccess = (id) => ({
  type: 'DELETE_DATA_SUCCESS',
  payload: id,
});

export const deleteDataError = (error) => ({
  type: 'DELETE_DATA_ERROR',
  payload: error,
});

export const fetchDevices = () => {
  return async (dispatch) => {
    dispatch(fetchDataStart());
    try {
      const response = await fetch('http://localhost:3000/devices');
      const data = await response.json();
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataError(error.message));
    }
  };
};

export const addDevice = (device) => {
  return async (dispatch) => {
    dispatch(postDataStart());
    try {
      const response = await fetch('http://localhost:3000/devices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(device),
      });
      const data = await response.json();
      dispatch(postDataSuccess(data));
    } catch (error) {
      dispatch(postDataError(error.message));
    }
  };
};

export const updateDevice = (device) => {
  return async (dispatch) => {
    dispatch(putDataStart());
    try {
      await fetch(`http://localhost:3000/devices/${device.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(device),
      });
      await dispatch(putDataSuccess(device));
    } catch (error) {
      dispatch(putDataError(error.message));
    }
  };
};

export const deleteDevice = (id) => {
  return async (dispatch) => {
    try {
      await fetch(`http://localhost:3000/devices/${id}`, {
        method: 'DELETE',
      });
      dispatch(deleteDataSuccess(id));
    } catch (error) {
      dispatch(deleteDataError(error.message));
    }
  };
};
