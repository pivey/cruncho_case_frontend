import { AppDispatch } from './redux/store';

export type ChildrenContainer = Pick<JSX.IntrinsicElements['div'], 'children'>;

export interface SelectedRestaurant {
  distance: number;
  location: {
    lat: number;
    lng: number;
  };
  open: boolean;
  photoReference: string;
  icon: string;
  name: string;
  placeId: string;
  priceLevel: number;
  rating: number;
  types: string[];
  userRatingTotal: number;
  vicinity: string;
}

export interface UserLocation {
  latitude: string;
  longitude: string;
}

export interface InfoPanelProps {
  dispatch: AppDispatch;
  panelOpen: boolean;
  selectedRestaurant: SelectedRestaurant;
}

export interface AppProps {
  dispatch: AppDispatch;
  userLocation: UserLocation;
}
