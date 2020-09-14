import React, { useEffect } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import Header from './components/Header';
import CrunchoIcon from './components/CrunchoIcon';
import DisplayMapFC from './components/Map';
import InfoPanel from './components/InfoPanel';
// import saveToLocalStorage from './utils/saveToLocalStorage';
import { RootState } from './redux/store';
import { AppProps } from './types';

const StyledIcon = styled(CrunchoIcon)`
  border-radius: 5px;
  width: 6rem;
  height: 6rem;
`;

const GlobalStyle = createGlobalStyle`
html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  color: black;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 10px;
  box-sizing: border-box;
}
`;

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App({ dispatch, userLocation }: AppProps) {
  const { latitude: userLat, longitude: userLong } = userLocation;

  const errorHandler = (err: any): void => {
    if (Number(err.code) === 1) {
      alert('Error: Access is denied!');
    } else if (Number(err.code) === 2) {
      alert('Error: Position is unavailable!');
    }
  };

  useEffect(() => {
    const setPosition = (position: any) => {
      const { latitude, longitude } = position.coords;
      // saveToLocalStorage('userCoordinates', { latitude, longitude });
      dispatch({
        type: 'SET_USERLOCATION',
        payload: { lat: latitude, lng: longitude },
      });
    };

    const getPosition = () => {
      if (navigator.geolocation) {
        return new Promise((res, rej) => {
          const options = { timeout: 6000 };
          navigator.geolocation.getCurrentPosition(res, rej);
        });
      }
    };

    const userPosition = async () => {
      const position = await getPosition();
      console.log(position, '****************');
      return position;
    };
    userPosition().then(res => {
      console.log('userPosition', res);
      setPosition(res);
    });
  }, [dispatch]);

  useEffect(() => {
    const getNearbyRestaurants = async () => {
      try {
        return await axios.post('http://localhost:8082/nearbyRestaurants', {
          latitude: userLat,
          longitude: userLong,
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    if (userLat && userLong) {
      getNearbyRestaurants().then((res: any = {}) => {
        // saveToLocalStorage('nearbyRestaurants', res.data);
        dispatch({ type: 'SET_RESTAURANT_DATA', payload: res.data });
      });
    }
  }, [dispatch, userLat, userLocation, userLong]);

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <Header>
          <StyledIcon />
        </Header>
        <DisplayMapFC />
        <InfoPanel />
      </PageContainer>
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  nearbyRestaurantData: state.nearbyRestaurantData,
  userLocation: state.userLocation,
});

export default connect(mapStateToProps)(App);
