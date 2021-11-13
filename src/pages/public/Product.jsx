/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { calcularPrecoPrazo } from 'correios-brasil';
import { Link } from 'react-router-dom';
import InputForm from '../../components/InputForm';
import { ReactComponent as ShippingIcon } from '../../assets/icons/shipping-fast.svg';
import Button from '../../components/Button';

export default function Product() {
  useEffect(() => {}, []);
  const [indexImage, setIndexImage] = useState(0);
  const [cep, setCep] = useState('');

  const senderInfo = {
    sCepOrigem: '20550110',
    sCepDestino: null,
    nVlPeso: '0.2',
    nCdFormato: '1',
    nVlComprimento: '17',
    nVlAltura: '8',
    nVlLargura: '11',
    nCdServico: ['04014', '04510'],
    nVlDiametro: '0',
  };

  const productTotalQty = 0;

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

  function controlPicture(n) {
    if (indexImage === 0 && n === -1) {
      setIndexImage(images.length - 1);
    } else if (indexImage === images.length - 1 && n === 1) {
      setIndexImage(0);
    } else {
      setIndexImage(indexImage + n);
    }
  }

  function handleCalculateShipping() {
    senderInfo.sCepDestino = cep;
    calcularPrecoPrazo(senderInfo)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
                  <option key={e}>{e + 1}</option>
                ))}
              </SelectQuantity>
              <AvailableQuantity>27 disponíveis</AvailableQuantity>
            </QuantityContainer>
            {productTotalQty > 0 ? (
              <>
                <ShippingCostContainer>
                  <p>
                    Calcular <span>frete e prazo</span>
                  </p>
                  <FieldShippingContainer>
                    <InputShippingCost
                      maxLength={9}
                      value={cep}
                      onChange={(e) =>
                        // eslint-disable-next-line implicit-arrow-linebreak
                        setCep(
                          e.target.value
                            .replace(/\D/g, '')
                            .replace(/^(\d{5})(\d{3})+?$/, '$1-$2'),
                        )}
                    />
                    <ButtonShippingCost
                      onClick={() => handleCalculateShipping()}
                    >
                      <ShippingIcon />
                    </ButtonShippingCost>
                  </FieldShippingContainer>
                </ShippingCostContainer>
                <ButtonAddCart>Adicione ao carrinho</ButtonAddCart>
                <ButtonBuyNow>Comprar agora</ButtonBuyNow>
              </>
            ) : (
              <>
                <ButtonSoldOff>Esgotado</ButtonSoldOff>
                <ButtonAlertMe>Avise-me quando disponível</ButtonAlertMe>
              </>
            )}
          </Sidebar>
        </ContainerProduct>
        <TitleSection>Sobre o produto</TitleSection>
        <DescriptionProduct>
          A marca GAN sempre está inovando e dessa vez ela trouxe o modelo 356
          R, que é o que tem de mais novo na sua linha de cubos profissionais
          (mas sem o magnetismo). Cubo leve e extremamente rápido, possue também
          um design nas peças internas que ajudam a deixar sua lubrificação mais
          uniforme. Seu padrão é semelhante aos seus outros modelos, com um
          tonalidade um pouco diferente no verde para diferenciar esse modelo
          dos outros.
        </DescriptionProduct>
        <TitleSection>Especificações</TitleSection>
        <DescriptionProduct>
          <p>Cor: Stickerless (Mixed - Peças coloridas)</p>
          <p>Marca: Gans Puzzle</p>
          <p>Modelo: 356 R</p>
          <p>Tamanho: 5,6 cm x 5,6 cm x 5,6 cm</p>
        </DescriptionProduct>
        <TitleSection>Acompanha</TitleSection>
        <DescriptionProduct>
          <p>Cubo Mágico Gan 356 R</p>
          <p>Manual</p>
          <p>Chave pra regulagem</p>
        </DescriptionProduct>
      </ContainerCenter>
    </Main>
  );
}

const DescriptionProduct = styled.p`
  font-weight: 500;
  font-size: 18px;
  color: #737070;
  line-height: 25px;
`;

const TitleSection = styled.h3`
  font-weight: 500;
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const ButtonBuyNow = styled(Button)`
  width: 100%;
  font-weight: 500;
  font-size: 22px;
`;

const ButtonAddCart = styled(ButtonBuyNow)`
  background-color: #16f948;
  margin-bottom: 12px;
`;

const ButtonSoldOff = styled(ButtonAddCart)`
  background-color: #f66565;
  font-weight: bold;
  margin-top: 15px;
`;

const ButtonAlertMe = styled(ButtonBuyNow)`
  background-color: #1382e9;
  font-size: 20px;
`;

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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 852px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Sidebar = styled.div`
  width: 345px;
  height: 100%;
  padding: 14px 20px;
  background: #ebebeb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  width: 100%;
  margin: 0 10px;
`;

const ArrowPassPrev = styled.div`
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
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
  max-width: 500px;
  height: 500px;
  position: relative;
  margin-bottom: 15px;
  @media (max-width: 400px) {
    height: 300px;
    min-width: 350px;
  }
`;

const TitleProduct = styled.h1`
  font-weight: 500;
  font-size: 24px;
  margin: 30px 0;
`;

const ContainerCenter = styled.div`
  max-width: 900px;
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
