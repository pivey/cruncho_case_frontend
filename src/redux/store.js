import { createStore } from 'redux';
import getFromLocalStorage from '../utils/getFromLocalStorage';

const initialState = {
  nearbyRestaurantData: getFromLocalStorage('nearbyRestaurants') || [],
  userLocation: getFromLocalStorage('userCoordinates') || {
    latitude: '',
    longitude: '',
  },
};

const appReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

const store = createStore(appReducer);

export default store;
