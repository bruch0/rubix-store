import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Product() {
  useEffect(() => {}, []);
  return (
    <ContainerProduct>
      <ContainerTopLinks>
        <TopLink to="/">Home</TopLink>
        <ArrowLinks />
        <TopLink to="/">3x3x3</TopLink>
      </ContainerTopLinks>
      <TitleProduct>
        Cubo Mágico Profissional GAN 356 RS stickerless 3x3x3
      </TitleProduct>
      <ContainerPictureShow>A</ContainerPictureShow>
    </ContainerProduct>
  );
}

const ContainerPictureShow = styled.div`
  max-width: 500px;
  background-color: red;
  position: relative;
  margin: auto;
`;

const TitleProduct = styled.h1`
  font-weight: 500;
  font-size: 24px;
  margin: 30px 0;
`;

const ContainerProduct = styled.div`
  margin: 130px 5%;
`;

const ContainerTopLinks = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
`;

const TopLink = styled(Link)`
  color: #737070;
  font-weight: 500;
  font-size: 21px;
  margin: 0;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const ArrowLinks = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin: 0 30px;
  color: #737070;
  &::before {
    content: '>';
  }

  @media (max-width: 400px) {
    font-size: 20px;
  }
`;
