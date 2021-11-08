import React from 'react';
import styled from 'styled-components';
import Products from './Products';

function Home() {
  return (
    <>
      <Banner />
      <Products />
    </>
  );
}

const Banner = styled.div`
  width: 100%;
  height: 500px;
`;

export default Home;
