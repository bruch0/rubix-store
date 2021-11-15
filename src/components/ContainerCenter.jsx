import React from 'react';
import styled from 'styled-components';

export default function ContainerCenter({ children }) {
  return (
    <Main>
      <Container>{children}</Container>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  margin: 0 10px;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 130px auto;
`;
