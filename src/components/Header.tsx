import * as React from 'react';
import styled from 'styled-components';
import { ChildrenContainer } from '../types';

const Container = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  padding: 1.2rem;
  width: 100vw;
  background: rgb(230, 23, 58);
  background: linear-gradient(
    323deg,
    rgba(230, 23, 58, 1) 59%,
    rgba(0, 0, 0, 1) 82%
  );
  margin-bottom: 2rem;
`;

const Header = ({ children }: ChildrenContainer) => (
  <Container>{children}</Container>
);

export default Header;
