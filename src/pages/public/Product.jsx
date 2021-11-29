import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Loader from 'react-loader-spinner';
import BuyNow from '../../components/modals/BuyNow';
import InputForm from '../../components/InputForm';
import { ReactComponent as ShippingIcon } from '../../assets/icons/shipping-fast.svg';
import Button from '../../components/Button';
import { getProduct, postCart } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import ModalContext from '../../contexts/ModalContext';
import ContainerCenter from '../../components/ContainerCenter';
import {
  convertToBRL,
  throwError,
  throwSuccess,
  getDelivery,
} from '../../services/utils';
import Loading from '../../components/Loading';

export default function Product() {
  const [product, setProduct] = useState([]);
  const [indexImage, setIndexImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [shippingCost, setShippingCost] = useState(null);
  const [cep, setCep] = useState('');

  const { user, logout } = useAuth();

  const { setModal } = useContext(ModalContext);

  const { id: productId } = useParams();

  function controlPicture(n) {
    if (indexImage === 0 && n === -1) {
      setIndexImage(product.images.length - 1);
    } else if (indexImage === product.images.length - 1 && n === 1) {
      setIndexImage(0);
    } else {
      setIndexImage(indexImage + n);
    }
  }

  async function handleCalculateShipping() {
    setIsLoading(true);
    if (cep.length !== 8) throwError('CEP Inválido!');
    setShippingCost(await getDelivery());
    setIsLoading(false);
  }

  const handleAddCart = () => {
    if (user) {
      postCart(productId, quantity, user.token)
        .then(() => throwSuccess('Adicionado!'))
        .catch((error) => {
          if (error.response.status === 400) {
            throwError('Quantidade maxima atingida.');
          } else if (error.response.status === 401) {
            logout();
          }
        });
    } else setModal('sign-in');
  };

  const handleBuyNow = () => {
    if (user) {
      setModal('buy-now');
    } else setModal('sign-in');
  };

  useEffect(() => {
    getProduct(productId).then((res) => {
      setProduct(res.data);
      setTimeout(() => setLoading(false), 1000);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <ContainerCenter>
      <ContainerTopLinks>
        <TopLink to="/">Home</TopLink>
        <ArrowLinks />
        <TopLink to={`/?category=${product.categoryName}`}>
          {product.categoryName}
        </TopLink>
      </ContainerTopLinks>
      <TitleProduct>{product.name}</TitleProduct>
      <ContainerProduct>
        <ContainerPictureShow>
          <PictureNumberText>
            {`${indexImage + 1}/${product.images.length}`}
          </PictureNumberText>
          <Picture src={product.images[indexImage].url} alt="Imagem" />
          <ArrowPassPrev onClick={() => controlPicture(-1)}>
            &#10094;
          </ArrowPassPrev>
          <ArrowPassNext onClick={() => controlPicture(1)}>
            &#10095;
          </ArrowPassNext>
        </ContainerPictureShow>
        <Sidebar>
          <Price>{convertToBRL(product.value)}</Price>
          <HorizontalLine />
          <QuantityContainer>
            <SelectQuantity onChange={(e) => setQuantity(e.target.value)}>
              {[...Array(product.total_qty).keys()].map((n) => (
                <option key={n}>{n + 1}</option>
              ))}
            </SelectQuantity>
            <AvailableQuantity>
              {product.total_qty}{' '}
              {product.total_qty > 1 ? 'disponíveis' : 'disponível'}
            </AvailableQuantity>
          </QuantityContainer>
          {product.total_qty > 0 ? (
            <>
              <ShippingCostContainer>
                <p>
                  Calcular <span>frete e prazo</span>
                </p>
                <FieldShippingContainer>
                  <NumberFormat
                    // eslint-disable-next-line no-use-before-define
                    customInput={InputShippingCost}
                    value={cep}
                    format="#####-###"
                    onValueChange={({ value }) => setCep(value)}
                  />
                  <ButtonShippingCost onClick={() => handleCalculateShipping()}>
                    {isLoading ? (
                      <Loader
                        type="TailSpin"
                        color="#000"
                        height={25}
                        width={30}
                      />
                    ) : (
                      <ShippingIcon />
                    )}
                  </ButtonShippingCost>
                </FieldShippingContainer>
                <DeliveryValue>
                  {shippingCost && (
                    <p>
                      SEDEX - 6 dias úteis -{' '}
                      <span>{convertToBRL(shippingCost)}</span>
                    </p>
                  )}
                </DeliveryValue>
              </ShippingCostContainer>
              <ButtonAddCart onClick={handleAddCart}>
                Adicione ao carrinho
              </ButtonAddCart>
              <ButtonBuyNow onClick={handleBuyNow}>Comprar agora</ButtonBuyNow>
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
      <DescriptionProduct>{product.description}</DescriptionProduct>
      <TitleSection>Especificações</TitleSection>
      <DescriptionProduct>
        <p>{`Cor: ${product.color}`}</p>
        <p>{`Marca: ${product.brandName}`}</p>
        <p>{`Modelo: ${product.model}`}</p>
        <p>{`Tamanho: ${product.size}`}</p>
      </DescriptionProduct>
      <TitleSection>Acompanha</TitleSection>
      <DescriptionProduct>
        {product.contains.map((item) => (
          <p key={item.item}>{item.item}</p>
        ))}
      </DescriptionProduct>
      <BuyNow id={productId} total={product.value} />
    </ContainerCenter>
  );
}

const DeliveryValue = styled.div`
  font-size: 15px;
  color: #737070;
  margin: 25px 3% 0px 3% !important;
`;

const InputShippingCost = styled(InputForm)`
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25) !important;
  width: 72%;
  margin-bottom: 0;
  @media (max-width: 350px) {
    border-radius: 24px;
  }
`;

const DescriptionProduct = styled.div`
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
  @media (max-width: 900px) {
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

  @media (max-width: 600px) {
    width: 100%;
  }
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
  @media (max-width: 500px) {
    height: 300px;
    width: 100%;
  }
`;

const TitleProduct = styled.h1`
  font-weight: 500;
  font-size: 24px;
  margin: 30px 0;
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
