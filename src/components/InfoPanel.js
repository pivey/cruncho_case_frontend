import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import StarIcon from './StarIcon';

const StyledStar = styled(StarIcon)`
  height: 10px;
  width: 10px;
`;

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
  height: 250px;
  margin-top: 85px;
  background-color: orange;
`;

const H1 = styled.h1`
  width: 100%;
  margin: 0;
`;

const P = styled.p`
  font-weight: bold;
  font-size: ${({ large }) => (large ? '2rem' : '1rem')};
  margin: 0;
  padding: 0;
`;

const DistanceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const InfoContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding-left: 1rem;
`;

const TitleBox = styled.div`
  padding: 1.5rem;
  display: flex;
  background: white;
  justify-content: space-between;
  border-bottom: 1.5px solid lightGray;
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const transformText = string =>
  string.charAt(0).toUpperCase() + string.substring(1).replace(/_/g, ' ');

const InfoPanel = () => {
  const selectedRestaurant = {
    distance: `${Math.floor(245.67889) / 100}km`,
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
  console.log(selectedRestaurant || 'nothing bro');
  const userRating = Math.floor(selectedRestaurant?.rating);

  return (
    <Container>
      <TestPicture />
      {selectedRestaurant && (
        <>
          <TitleBox>
            <InfoContainer>
              <H1>{selectedRestaurant.name}</H1>
              <StarContainer>
                <P>{`${userRating}`}</P>
                {[...Array(userRating).keys()].map(() => (
                  <StyledStar />
                ))}

                <P>{`(${selectedRestaurant.userRatingTotal})`}</P>
              </StarContainer>
            </InfoContainer>
            <DistanceContainer>
              <P large>{selectedRestaurant.distance}</P>
            </DistanceContainer>
          </TitleBox>
          {selectedRestaurant.types.map(type => (
            <div>{transformText(type)}</div>
          ))}
          <div>{selectedRestaurant.vicinity}</div>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  selectedRestaurant: state.selectedRestaurant,
});

export default connect(mapStateToProps)(InfoPanel);
