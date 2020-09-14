import { createStore } from 'redux';
// import getFromLocalStorage from '../utils/getFromLocalStorage';

interface Action {
  type: string;
  payload?: any;
}

const initialState = {
  closePanel: false,
  panelOpen: false,
  nearbyRestaurantData: [],
  selectedRestaurant: {},
  userLocation: {
    latitude: '',
    longitude: '',
  },
};

const appReducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case 'SET_USERLOCATION':
      return {
        ...state,
        userLocation: {
          latitude: payload.lat,
          longitude: payload.lng,
        },
      };
    case 'SET_RESTAURANT_DATA':
      return {
        ...state,
        nearbyRestaurantData: payload,
      };
    case 'SET_SELECTED_RESTSURANT':
      return {
        ...state,
        selectedRestaurant: payload,
      };
    case 'SET_DISTANCE':
      return {
        ...state,
        selectedRestaurant: {
          ...state.selectedRestaurant,
          distance: payload,
        },
      };
    case 'CLOSE_INFO_PANEL':
      return {
        ...state,
        panelOpen: false,
      };
    case 'OPEN_INFO_PANEL':
      return {
        ...state,
        panelOpen: true,
      };
    default:
      return state;
  }
};

const store = createStore(appReducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof appReducer>;

export default store;
