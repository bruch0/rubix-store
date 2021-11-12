import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Product() {
  useEffect(() => {}, []);
  const [indexImage, setIndexImage] = useState(0);

  const images = [
    {
      url: 'https://www.ziicube.com/image/cube/Gan/12-Maglev/GAN-12-01.jpg',
    },
    {
      url: 'https://www.ziicube.com/image/cube/Gan/12-Maglev/GAN-12-02.jpg',
    },
    {
      url: 'https://www.ziicube.com/image/cube/Gan/12-Maglev/GAN-12-03.jpg',
    },
    {
      url: 'https://www.ziicube.com/image/cube/Gan/12-Maglev/GAN-12-04.jpg',
    },
  ];

  // eslint-disable-next-line no-unused-vars
  function controlPicture(n) {
    if (indexImage === 0 && n === -1) {
      setIndexImage(images.length - 1);
    } else if (indexImage === images.length - 1 && n === 1) {
      setIndexImage(0);
    } else {
      setIndexImage(indexImage + n);
    }
  }

  return (
    <Main>
      <ContainerProduct>
        <ContainerTopLinks>
          <TopLink to="/">Home</TopLink>
          <ArrowLinks />
          <TopLink to="/">3x3x3</TopLink>
        </ContainerTopLinks>
        <TitleProduct>
          Cubo Mágico Profissional GAN 356 RS stickerless 3x3x3
        </TitleProduct>
        <ContainerPictureShow>
          <PictureNumberText>
            {indexImage + 1}
            /
            {images.length}
          </PictureNumberText>
          <Picture src={images[indexImage]?.url} alt="Imagem" />
          <ArrowPassPrev onClick={() => controlPicture(-1)}>
            &#10094;
          </ArrowPassPrev>
          <ArrowPassNext onClick={() => controlPicture(1)}>
            &#10095;
          </ArrowPassNext>
        </ContainerPictureShow>
      </ContainerProduct>
    </Main>
  );
}

const Main = styled.main`
  display: flex;

`;

const ArrowPassPrev = styled.div`
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: black;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const ArrowPassNext = styled(ArrowPassPrev)`
  right: 0;
  border-radius: 3px 0 0 3px;
`;

const Picture = styled.img`
  width: 100%;
  height: 100%;
  margin: auto 0;
  object-fit: cover;
`;

const PictureNumberText = styled.div`
  color: #000000;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
`;

const ContainerPictureShow = styled.div`
  width: 500px;
  height: 500px;
  position: relative;
  
`;

const TitleProduct = styled.h1`
  font-weight: 500;
  font-size: 24px;
  margin: 30px 0;
`;

const ContainerProduct = styled.div`
  margin: 130px auto;
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
