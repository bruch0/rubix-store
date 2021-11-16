/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-restricted-globals */
import React, { useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import NumberFormat from 'react-number-format';
import { buyCartCheckout } from '../../services/api.js';
import {
  convertToBRL, getDelivery, throwError, throwSuccess,
} from '../../services/utils.js';
import Logo from '../Logo';
import StoreName from '../StoreName';
import { useAuth } from '../../contexts/AuthContext';
import deliveryLogo from '../../assets/icons/delivery.png';
import '../../shared/styles/modal.css';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import ModalContext from '../../contexts/ModalContext';
import InputForm from '../InputForm';

export default function BuyNow({ total, id }) {
  const [cep, setCep] = useState('');
  const [delivery, setDelivery] = useState(0);
  const [loading, setLoading] = useState(false);
  const { modal, setModal } = useContext(ModalContext);
  const { user } = useAuth();

  const cart = [
    {
      productId: id,
      productQty: 1,
    },
  ];

  function quickBuy(event) {
    event.preventDefault();
    if (cep.length < 7) {
      throwError('Insira um cep válido');
      return;
    }
    setLoading(true);
    buyCartCheckout(total + delivery, cart, user.token)
      .then(() => {
        throwSuccess('Compra realizada');
        setModal(null);
        setCep('');
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          throwError('Cep não encontrado');
        }
        setLoading(false);
      });
  }

  async function handleCalculateShipping() {
    setLoading(true);
    if (cep.length !== 8) throwError('CEP Inválido!');
    setDelivery(await getDelivery(cep, '0.2'));
    setLoading(false);
  }

  return (
    <Popup open={modal === 'buy-now'} modal closeOnDocumentClick={false}>
      <ContainerQuickBuy>
        <CloseButton onClick={() => setModal(null)}>
          <CloseIcon />
        </CloseButton>
        <div>
          <Logo />
          <StoreName />
        </div>
        <Total>
          <Value>{convertToBRL(total + delivery)}</Value>
          <p>Calcular frete e prazo</p>
          <div>
            <NumberFormat
              customInput={InputShippingCost}
              value={cep}
              format="#####-###"
              onValueChange={({ value }) => setCep(value)}
            />
            <Calculate
              isLoading={loading ? 1 : 0}
              onClick={() => handleCalculateShipping()}
            >
              {loading
                ? <Loader type="TailSpin" color="#000" height={25} width={30} />
                : <img src={deliveryLogo} alt="Calcular" />}
            </Calculate>
          </div>
          <DeliveryValue>
            {delivery && (
            <p>
              SEDEX - 6 dias úteis -
              {' '}
              <span>{convertToBRL(delivery)}</span>
            </p>
            )}
          </DeliveryValue>
          <ButtonForm onClick={quickBuy} disabled={cep.length < 8 || !delivery}>

            {loading ? <Loader type="ThreeDots" color="#FFFFFF" height={25} width={100} /> : 'Comprar'}
          </ButtonForm>
        </Total>
      </ContainerQuickBuy>
    </Popup>
  );
}

const InputShippingCost = styled(InputForm)`
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25) !important;
  width: 72%;
  margin-bottom: 0;
  @media (max-width: 350px) {
    border-radius: 24px;
  }
`;

const ContainerQuickBuy = styled.div`
  position: relative;
  background-color: #ffffff;
  width: 600px;
  height: 500px;
  padding: 20px;
  border-radius: 37px;
  color: #000;
  p {
    margin-top: 7px;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  h2 {
    font-weight: bold;
    font-size: 27px;
    margin: 20px auto;
    @media (max-width: 600px) {
      font-size: 20px;
    }
  }
  div {
    text-align: center;
  }
  h3 {
    font-size: 16px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
  }
  @media (max-width: 600px) {
    padding: 10px;
    width: 350px;
  }
  @media (max-width: 350px) {
    border-radius: 0px;
    padding: 10px 0px;
    width: 350px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  height: 40px;
  width: 55px;
  top: 15px;
  right: 15px;
  background: #ebebeb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  border: 0px;
  cursor: pointer;
`;

const Total = styled.section`
  width: 100%;
  margin-top: 50px;
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
  span {
    font-weight: bold;
  }
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
