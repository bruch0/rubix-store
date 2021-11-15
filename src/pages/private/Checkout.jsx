/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Loader from 'react-loader-spinner';
import { getDelivery } from '../../services/utils.js';
import { getCartCheckout, buyCartCheckout } from '../../services/api.js';
import { useAuth } from '../../contexts/AuthContext';
import deliveryLogo from '../../assets/icons/delivery.png';

function Checkout() {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(null);
  const [weight, setWeight] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const currencyFormat = {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  };

  useEffect(() => {
    if (user) {
      getCartCheckout(user.userId)
        .then((response) => {
          setCart(response.data.cart);
          setTotal(response.data.subTotal);
          setWeight(response.data.totalWeight);
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            confirmButtonColor: '#1382e9',
            text: 'Não autorizado',
          });
          navigate('/');
        });
    }
  }, [user]);

  return (
    <CheckoutPage isLoading={loading && cart === null ? 1 : 0}>
      <Title>Checkout</Title>
      {cart?.length === 0 ? 'Opa, você não tem nada no carrinho'
        : (
          <ContainerCheckout>
            <ProductsContainer>
              {cart !== null ? cart.map((product) => (
                <Product key={product.productId}>
                  <Container>
                    <ProductImg src={product.productUrl} />
                    <ProductName>{product.productName}</ProductName>
                  </Container>
                  <ContainerValueQty>
                    <ProductQty>{product.productQty}</ProductQty>
                    <ProductValue>
                      {(product.totalValue / 100).toLocaleString('pt-BR', currencyFormat)}
                    </ProductValue>
                  </ContainerValueQty>
                </Product>
              )) : ''}
            </ProductsContainer>
            <Total>
              <Value>{((total + delivery) / 100).toLocaleString('pt-BR', currencyFormat)}</Value>
              <p>Calcular frete e prazo</p>
              <div>
                <CepForm
                  maxLength={9}
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2'))}
                />
                <Calculate
                  isLoading={loading ? 1 : 0}
                  onClick={() => {
                    setLoading(true);
                    getDelivery(setDelivery, cep, (weight / 1000));
                    setTimeout(() => setLoading(false), 1000);
                  }}
                >
                  {loading
                    ? <Loader type="TailSpin" color="#000" height={25} width={30} />
                    : <img src={deliveryLogo} alt="Calcular" />}
                </Calculate>
              </div>
              <DeliveryValue>
                {delivery !== 0 ? `SEDEX - 6 dias úteis - R$ ${(delivery / 100).toFixed(2).replace('.', ',')}` : ''}
              </DeliveryValue>
              <ButtonForm
                disabled={(cep.length === 9 && delivery !== 0) ? 0 : 1}
                onClick={() => {
                  setLoading(true);
                  buyCartCheckout(user.userId, total + delivery, cart)
                    .then(() => {
                      setCart([]);
                      setTotal(0);
                      setWeight(0);
                      setDelivery(0);
                      Swal.fire({
                        icon: 'success',
                        confirmButtonColor: '#1382e9',
                        text: 'Compra realizada!',
                      });
                      setLoading(false);
                    });
                }}
                isLoading={loading ? 1 : 0}
              >
                {loading ? <Loader type="ThreeDots" color="#FFFFFF" height={25} width={100} /> : 'Comprar'}
              </ButtonForm>
            </Total>
          </ContainerCheckout>
        )}
    </CheckoutPage>
  );
}

const CheckoutPage = styled.main`
  width: 100%;
  padding: 5%;
  margin-top: 100px;
  font-size: 25px;
`;

const Title = styled.p`
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  font-size: 50px;
  margin-bottom: 15px;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const ContainerCheckout = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const ProductsContainer = styled.section`
  width: 70%;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Product = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #EBEBEB;
  border-radius: 22px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 25px;

  @media (max-width: 800px) {
    flex-direction: column;
    height: 130px;
  }
`;

const ProductImg = styled.img`
  height: 100%;
  width: 100px;
  border-radius: 22px 0px 0px 22px;
  margin-right: 15px;
`;

const ProductName = styled.p`
  font-size: 1.2vw;
  font-weight: 600;

  @media (max-width: 1000px) {
    font-size: 1.5vw;
  }

  @media (max-width: 900px) {
    font-size: 3.5vw;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 300px;

  @media (max-width: 1000px) {
    min-width: 250px;
  }
  
  @media (max-width: 800px) {
    min-width: 100%;
  }
`;

const ContainerValueQty = styled.div`
display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 300px;

  @media (max-width: 1000px) {
    min-width: 250px;
  }
  
  @media (max-width: 800px) {
    min-width: 90%;
    flex-direction: row-reverse;
    margin-bottom: 15px;
  }
`;

const ProductQty = styled.div`
  width: 50px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  border-radius: 22px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  background-color: #FFFFFF;
`;

const ProductValue = styled.p`
  font-size: 2vw;
  font-weight: 700;
  color: #1382E9;
  margin-right: 30px;

  @media (max-width: 1500px) {
    font-size: 2.5vw;
  }

  @media (max-width: 1000px) {
    font-size: 3.5vw;
  }
  
  @media (max-width: 800px) {
    font-size: 5vw;
  }
`;

const Total = styled.section`
  width: 25%;
  height: fit-content;
  padding: 2% 5px 10px 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #EBEBEB;
  border-radius: 22px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  p {
    margin: 10px 3%;
    font-size: 20px;
    font-weight: 500;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Value = styled.div`
  width: 100%;
  text-align: center;
  font-size: 3vw;
  font-weight: 700;
  color: #1382E9;
  padding-bottom: 5px;
  border-bottom: 2px solid black;

  @media (max-width: 1000px) {
    font-size: 4vw;
  }

  @media (max-width: 800px) {
    font-size: 10vw;
  }
`;

const CepForm = styled.input`
  font-family: 'Quicksand', sans-serif;
  outline: none;
  height: 35px;
  width: 70%;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  border: 0px;
  margin: 0px;
  padding-left: 20px;
  font-size: 18px;
  font-weight: 500;
`;

const Calculate = styled.button`
  width: 20%;
  border: 0px;
  border-radius: 22px;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  pointer-events: ${(props) => (props.isLoading ? 'none' : 'all')};
`;

const DeliveryValue = styled.p`
  font-size: 15px;
  color: #737070;
  margin: 25px 3% 0px 3% !important;
`;

const ButtonForm = styled.button`
  width: 100%;
  height: 45px;
  border: none;
  background-color: ${(props) => (props.disabled ? '#2e2f2e' : '#16F948')};
  color: #FFF;
  border-radius: 22px;
  cursor: pointer;
  font-weight: 700;
  font-size: 30px;
  font-family: 'Quicksand', sans-serif;
  margin-top: 25px;
  pointer-events: ${(props) => (props.isLoading ? 'none' : 'all')};
`;

export default Checkout;
