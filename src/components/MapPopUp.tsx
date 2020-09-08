import * as React from 'react';
import styled from 'styled-components';
import { ChildrenContainer } from '../types';

const DialogBox = styled.div`
  border: 2px solid pink;
  background: white;
  font-size: 1.2rem;
  width: 100px;
  height: 100px;
  color: blue;
`;

const MapPopUp = ({ children }: ChildrenContainer) => (
  <DialogBox>{children}</DialogBox>
);

export default MapPopUp;
