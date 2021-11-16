import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LoadingIcon } from '../assets/loading/loading.svg';

export default function Loading() {
  return (
    <Main>
      <BigLoading />
    </Main>
  );
}

const BigLoading = styled(LoadingIcon)`
  width: 15%;
`;

const Main = styled.main`
  padding-top: min(300px, 30vh);
  display: flex;
`;
