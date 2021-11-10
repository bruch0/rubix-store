import React from 'react';
import styled from 'styled-components';

function Banner() {
  return (
    <BannerSection id="banner" />
  );
}

const BannerSection = styled.section`
  width: 100%;
  height: 500px;
  margin-top: 100px;
  background-image: url('Assets/Banner/background.png');
  background-position: center;

  @media (max-width: 600px) {
    height: 300px;
  }
`;

export default Banner;
