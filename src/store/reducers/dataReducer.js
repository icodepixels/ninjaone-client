const initialState = {
  data: [],
  loading: false,
  error: null,
  postStatus: {
    loading: false,
    error: null,
    message: null,
    lastAddedDevice: null,
  },
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_START':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case 'FETCH_DATA_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'POST_DATA_START':
      return {
        ...state,
        loading: true,
      };
    case 'POST_DATA_SUCCESS':
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
      };
    case 'POST_DATA_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'UPDATE_DATA_START':
      return {
        ...state,
        loading: true,
      };
    case 'UPDATE_DATA_SUCCESS':
      return {
        ...state,
        data: state.data.map((device) =>
          device.id === action.payload.id ? action.payload : device
        ),
        loading: false,
      };
    case 'UPDATE_DATA_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'DELETE_DATA_SUCCESS':
      return {
        ...state,
        data: state.data.filter((device) => device.id !== action.payload),
      };
    case 'DELETE_DATA_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default dataReducer;
