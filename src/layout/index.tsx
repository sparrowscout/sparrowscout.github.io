import React from 'react';
import GlobalStyle from '../styles/globalStyle';

import { ReactNode } from 'react';
import styled from 'styled-components';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <GlobalStyle />
      {children}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(to bottom, #f8f8f8, #f8f8f8 30px, #000000 31px);
`;
