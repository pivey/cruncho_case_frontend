import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  height: 100vh;
  width: 400px;
  display: flex;
  flex-direction: column;

  background: white;
`;

const TestPicture = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 85px;
  background-color: orange;
`;

const TestDiv = styled.div`
  width: 100%;
  height: 40px;
  border: 1px solid red;
`;

const TitleBox = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: space-around;
  background: green;
`;

const InfoPanel = () => {
  const selectedData = {
    location: {
      lat: 59.336612,
      lng: 18.083726,
    },
    open: true,
    photos: [
      {
        height: 1960,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/114402302041188693747">Anton Nordenfur</a>',
        ],
        photo_reference:
          'CkQ0AAAAiM1nbZMUou24KHSZHa11IMQzWBoXXTyMNbEcd0vhf8SfSXP_GwDjhFDmQwiVZvIWv-Jqh0rgKY70JuYNuccVtxIQIvtysYqUVUssDGnA3ScTHhoU4nc2kSKcxpjJqEkGQXP9T5EmUOY',
        width: 4032,
      },
    ],
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
    name: 'Sabai Soong',
    placeId: 'ChIJd9PwUUWdX0YRV8L6H-_Ct1M',
    priceLevel: 2,
    rating: 4.2,
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    userRatingTotal: 192,
    vicinity: 'Linnégatan 39B, Stockholm',
  };

  return (
    <Container>
      <TestPicture />
      <TitleBox>
        <TestDiv>name</TestDiv>
        <TestDiv>{`${Math.floor(selectedData.rating)}`}</TestDiv>
      </TitleBox>
      <TestDiv>types</TestDiv>
      <TestDiv>vicinity</TestDiv>
    </Container>
  );
};

export default InfoPanel;
