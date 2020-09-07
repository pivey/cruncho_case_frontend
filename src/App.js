import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import CrunchoIcon from './components/CrunchoIcon';
import { DisplayMapFC } from './components/Map';

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
  background-color: mistyrose;
  font-size: 10px;
  box-sizing: border-box;
  overflow: ${({ modalOpen }) => (modalOpen ? 'hidden' : 'scroll')}
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

const Button = styled.button.attrs(() => ({
  type: 'password',
}))`
  all: unset;
  font-size: 2rem;
  font-weight: bold;
  color: ${({ buttonColor }) => buttonColor || 'white'};
  background-color: ${({ bgcColor }) => bgcColor || '#e6173a'};
  padding: ${({ btnPad }) => btnPad || '1.5rem'};
  border-radius: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

// const DialogButton = styled(Button).attrs(() => ({
//   btnPad: '1rem',
// }))``;

// const Modal = styled.div`
//   background-color: rgb(0, 0, 0, 0.6);
//   position: fixed;
//   padding: 0;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   z-index: 998;
//   visibility: ${({ modalOpen }) => (modalOpen ? 'visible' : 'hidden')};
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const GeoConsetDialog = styled.div`
//   padding: 2.5rem;
//   border-radius: 2rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background-color: white;
//   max-width: 30rem;
//   text-align: center;
// `;

// const ButtonHolder = styled.div`
//   display: flex;
//   width: 100%;
//   align-items: center;
//   justify-content: space-around;
//   margin: 1.5rem 0;
// `;

function App() {
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState({
    longitude: '',
    latitude: '',
  });
  const { latitude: userLat, longitude: userLong } = userLocation;
  // const [modalOpen, setModalOpen] = useState(false);

  const setPosition = position => {
    const { latitude, longitude } = position.coords;
    setUserLocation({
      longitude,
      latitude,
    });
  };

  const errorHandler = err => {
    if (Number(err.code) === 1) {
      alert('Error: Access is denied!');
    } else if (Number(err.code) === 2) {
      alert('Error: Position is unavailable!');
    }
  };

  useEffect(() => {
    const getPosition = () => {
      if (navigator.geolocation) {
        const options = { timeout: 60000 };
        return new Promise((res, rej) => {
          navigator.geolocation.getCurrentPosition(
            res,
            rej,
            errorHandler,
            options
          );
        });
      }
    };
    // if (loading) {
    const userPosition = async () => {
      const position = await getPosition();
      return position;
    };
    userPosition().then(res => {
      console.log('userPosition', res);
      setPosition(res);
    });
    // }
  }, []);

  useEffect(() => {
    const getNearbyRestaurants = async () => {
      try {
        return await axios.post('http://localhost:8080/nearbyRestaurants', {
          latitude: userLat,
          longitude: userLong,
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    // if (userLat && userLong) {
    //   getNearbyRestaurants(userLocation).then(res =>
    //     console.log('getNearbyRestaurants res', res.data)
    //   );
    //   setLoading(false);
    // }
    console.log('userLocation', userLocation);
    console.log('loading', loading);
  }, [userLocation, loading, userLat, userLong]);

  return (
    <>
      <GlobalStyle />
      {/* <Modal modalOpen={modalOpen}>
        <GeoConsetDialog>
          <h1>Consent to use of GPS to get your current location?</h1>
          <ButtonHolder>
            <DialogButton
              onClick={() => {
                setGeoConsent(true);
                setModalOpen(false);
              }}
            >
              Accept
            </DialogButton>
            <DialogButton
              onClick={() => {
                setGeoConsent(false);
                setModalOpen(false);
              }}
            >
              Cancel
            </DialogButton>
          </ButtonHolder>
        </GeoConsetDialog>
      </Modal> */}
      <PageContainer>
        <Header>
          <StyledIcon />
        </Header>
        <DisplayMapFC userLat={userLat} userLong={userLong} />
        {/* <Button onClick={() => setLoading(true)}>
          {loading ? 'Loading...' : 'Click to search'}
        </Button> */}
        {/* {userLocation.longitude && userLocation.latitude && (
          <div>
            <p>{`latitude: ${userLocation.latitude}`}</p>
            <p>{`longitude: ${userLocation.longitude}`}</p>
          </div>
        )} */}
      </PageContainer>
    </>
  );
}

export default App;
