import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import StarIcon from './StarIcon';
import CloseIcon from './CloseIcon';
import { RootState } from '../redux/store';
import { InfoPanelProps } from '../types';
import transformText from '../utils/transformText';

const StyledStar = styled(StarIcon)`
  height: 1.5rem;
  width: 1.5rem;
`;

const StyledClose = styled(CloseIcon)`
  position: absolute;
  z-index: 100;
  top: 2rem;
  right: 2rem;
  width: 2rem;
  height: 2rem;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;

const Container = styled.div.attrs(({ panelOpen }: { panelOpen: boolean }) => ({
  panelOpen,
}))`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  height: 100vh;
  width: 400px;
  display: flex;
  flex-direction: column;
  background: white;
  display: ${({ panelOpen }) => (panelOpen ? 'block' : 'none')};
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ImageContainer = styled.div`
  min-height: 250px;
  min-width: 400px;
  margin-top: 85px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  width: 100%;
  margin: 0;
`;

const H2 = styled.h2`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const P = styled.p.attrs(({ large }: { large: boolean }) => ({
  large,
}))`
  font-weight: bold;
  font-size: ${({ large }) => (large ? '2rem' : '1.5rem')};
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
  padding-left: 1rem;
`;

const TitleBox = styled.div`
  padding: 2rem;
  display: flex;
  background: white;
  justify-content: space-between;
  border-bottom: 1px solid lightGray;
`;

const StarContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const TypeBox = styled.div`
  display: flex;
  min-width: 3rem;
  align-items: center;
  justify-content:center;
  font-size: 1rem;
  font-weight:bold;
  padding: 0.6rem;
  border-radius: 10px;
  border 2px solid #808080;
  & + & {
    margin-right: 0.5rem;
  }
`;

const InfoPanel = ({
  dispatch,
  panelOpen,
  selectedRestaurant,
}: InfoPanelProps) => {
  const userRating = Math.floor(selectedRestaurant?.rating);
  const photoReference = selectedRestaurant?.photoReference;

  return (
    <>
      {selectedRestaurant && (
        <Container panelOpen={panelOpen}>
          <ImageContainer>
            {photoReference ? (
              <Image
                src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&maxheight=250&maxwidth=400&key=AIzaSyBy63r8gBP73udk8z6FchiCCl6k5tpgqzw`}
              />
            ) : (
              <P>No photo available</P>
            )}

            <StyledClose
              onClick={() => dispatch({ type: 'CLOSE_INFO_PANEL' })}
            />
          </ImageContainer>
          <>
            <TitleBox>
              <InfoContainer>
                <H1>{selectedRestaurant.name}</H1>
                <StarContainer>
                  <P>{`${userRating}`}</P>
                  <div style={{ margin: '0 1rem' }}>
                    {[...Array(5).keys()].map((el, ind) => {
                      if (ind < userRating) {
                        return (
                          <StyledStar fill="#FABD03" key={Math.random()} />
                        );
                      }
                      return <StyledStar fill="#808080" key={Math.random()} />;
                    })}
                  </div>
                  <P>{`(${selectedRestaurant.userRatingTotal})`}</P>
                </StarContainer>
              </InfoContainer>
              <DistanceContainer>
                <P large>{selectedRestaurant.distance}</P>
              </DistanceContainer>
            </TitleBox>
            <TitleBox>
              <H2>Address: {selectedRestaurant.vicinity}</H2>
            </TitleBox>
            <TitleBox>
              {selectedRestaurant.types?.map(type => (
                <TypeBox key={Math.random()}>{transformText(type)}</TypeBox>
              ))}
            </TitleBox>
          </>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  panelOpen: state.panelOpen,
  selectedRestaurant: state.selectedRestaurant,
});

export default connect(mapStateToProps)(InfoPanel);
