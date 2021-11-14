import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCart } from '../../services/api';
import Logo from '../../components/Logo';
import { throwError, throwSuccess } from '../../services/utils.js';
import ContainerCenter from '../../components/ContainerCenter';
import { useAuth } from '../../contexts/AuthContext';
import { convertToBRL } from '../../services/utils.js';
import Button from '../../components/Button';

export default function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    getCart(user.token).then((res) => {
      setItems(res.data);
      console.log(res.data);
    });
  }, []);

  if (items.length === 0) {
    return <h1>Loading</h1>;
  }

  return (
    <ContainerCenter>
      <TitleCart />
      <ItemsListContainer>
        {items.map((item) => (
          <Item>
            <div>
              <ImageItem src={item.imageUrl} />
              <NameItem>{item.name}</NameItem>
            </div>
            <div>
              <Teste>{item.qty}</Teste>
              <ValueItem>{convertToBRL(item.value)}</ValueItem>
            </div>
          </Item>
        ))}
        <ContainerButtons>
          <ButtonBackHome onClick={() => navigate('/')}>
            Voltar para a loja
          </ButtonBackHome>
          <ButtonCheckout onClick={() => navigate('/checkout')}>
            Ir para o checkout
          </ButtonCheckout>
        </ContainerButtons>
      </ItemsListContainer>
    </ContainerCenter>
  );
}

const ButtonBackHome = styled(Button)`
  margin-top: 20px;
  width: 422px;
  height: 80px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  background-color: #ebebeb;
  color: black;
  font-weight: 500;
  font-size: 30px;
  @media (max-width: 600px) {
    font-size: 20px;
    height: 35px;
    margin-top: 10px;
  }
`;

const ButtonCheckout = styled(ButtonBackHome)`
  background-color: #16f948;
  color: white;
`;

const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 845px) {
    justify-content: space-around;
  }
`;

const ValueItem = styled.h4`
  font-weight: bold;
  font-size: 32px;
  margin: auto 30px;
  color: #1382e9;
  @media (max-width: 600px) {
    font-size: 21px;
  }
`;

const Teste = styled.div`
  width: 100px;
  height: 50px;
  background-color: red;
`;

const NameItem = styled.h3`
  font-size: 14px;
  font-weight: 500;
  font-size: 22px;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const ImageItem = styled.img`
  width: 92px;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 0px 0px 10px;
  margin-right: 15px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  background: #ebebeb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  margin-bottom: 10px;
  div {
    display: flex;
    align-items: center;
  }
`;

const ItemsListContainer = styled.div`
  width: 100%;
`;

const TitleCart = styled.h1`
  font-weight: bold;
  font-size: 36px;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    font-size: 24px;
  }
  &::after {
    content: 'Carrinho';
  }
`;
