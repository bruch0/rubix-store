/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import InputForm from '../../components/InputForm';
import { ReactComponent as ShippingIcon } from '../../assets/icons/shipping-fast.svg';

export default function Product() {
  useEffect(() => {}, []);
  const [indexImage, setIndexImage] = useState(0);
  const [cep, setCep] = useState('');

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
      <ContainerCenter>
        <ContainerTopLinks>
          <TopLink to="/">Home</TopLink>
          <ArrowLinks />
          <TopLink to="/">3x3x3</TopLink>
        </ContainerTopLinks>
        <TitleProduct>
          Cubo Mágico Profissional GAN 356 RS stickerless 3x3x3
        </TitleProduct>
        <ContainerProduct>
          <ContainerPictureShow>
            <PictureNumberText>
              {indexImage + 1}/{images.length}
            </PictureNumberText>
            <Picture src={images[indexImage]?.url} alt="Imagem" />
            <ArrowPassPrev onClick={() => controlPicture(-1)}>
              &#10094;
            </ArrowPassPrev>
            <ArrowPassNext onClick={() => controlPicture(1)}>
              &#10095;
            </ArrowPassNext>
          </ContainerPictureShow>
          <Sidebar>
            <Price>R$ 129,99</Price>
            <HorizontalLine />
            <QuantityContainer>
              <SelectQuantity name="product_quantity">
                {[...Array(10).keys()].map((e) => (
                  <option>{e + 1}</option>
                ))}
              </SelectQuantity>
              <AvailableQuantity>27 disponíveis</AvailableQuantity>
            </QuantityContainer>
            <ShippingCostContainer>
              <p>
                Calcular <span>frete e prazo</span>
              </p>
              <FieldShippingContainer>
                <InputShippingCost
                  maxLength={9}
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2'))}
                />
                <ButtonShippingCost>
                  <ShippingIcon />
                </ButtonShippingCost>
              </FieldShippingContainer>
            </ShippingCostContainer>
          </Sidebar>
        </ContainerProduct>
      </ContainerCenter>
    </Main>
  );
}

const FieldShippingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 7px;
`;

const ButtonShippingCost = styled.button`
  width: 74px;
  height: 35px;
  outline: none;
  border: none;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  cursor: pointer;
`;

const InputShippingCost = styled(InputForm)`
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25) !important;
  width: 72%;
  margin-bottom: 0;
`;

const ShippingCostContainer = styled.div`
  margin: 30px 0px;
  p {
    font-weight: 500;
    font-size: 18px;
    margin-left: 5px;
  }
  span {
    font-weight: bold;
  }
`;

const AvailableQuantity = styled.p`
  font-weight: 500;
  font-size: 20px;
  color: #737070;
`;

const SelectQuantity = styled.select`
  font-family: 'Quicksand', sans-serif;
  width: 150px;
  height: 40px;
  padding-left: 50px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  border: none;
  font-weight: 500;
  font-size: 24px;
  outline: none;
  appearance: none;
  background: #fff
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 330 330' style='enable-background:new 0 0 330 330' xml:space='preserve'%3E%3Cpath d='M325.607 79.393c-5.857-5.857-15.355-5.858-21.213.001l-139.39 139.393L25.607 79.393c-5.857-5.857-15.355-5.858-21.213.001-5.858 5.858-5.858 15.355 0 21.213l150.004 150a14.999 14.999 0 0 0 21.212-.001l149.996-150c5.859-5.857 5.859-15.355.001-21.213z'/%3E%3C/svg%3E")
    no-repeat;
  background-position: right 15px top 50%;
  background-size: 30px;
`;

const QuantityContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const HorizontalLine = styled.div`
  width: 110%;
  border-top: 2px #686565 solid;
  margin: 15px -15px;
`;

const Price = styled.h2`
  color: #1382e9;
  font-weight: bold;
  font-size: 40px;
  margin-top: 5px;
  text-align: center;
`;

const ContainerProduct = styled.div`
  width: 900px;
  display: flex;
  justify-content: space-between;
`;

const Sidebar = styled.div`
  width: 345px;
  padding: 14px 20px;
  background: #ebebeb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  display: flex;
  flex-direction: column;
`;

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
  border-radius: 7px;
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

const ContainerCenter = styled.div`
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
