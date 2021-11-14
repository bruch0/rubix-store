import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCart } from '../../services/api';
import { throwError, throwSuccess } from '../../services/utils.js';
import ContainerCenter from '../../components/ContainerCenter';
import { useAuth } from '../../contexts/AuthContext';
import { convertToBRL } from '../../services/utils.js';
import Button from '../../components/Button';
import DropdownQuantity from '../../components/DropdownQuantity';

export default function Cart() {
  const [items, setItems] = useState([]);
  const [renderCart, setRenderCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    getCart(user.token).then((res) => {
      setItems(res.data);
      console.log(res.data);
      setLoading(false);
    });
  }, [renderCart]);

  if (loading) return <h1>CARREGANDO... CRIAR ALGO LEGAL</h1>;

  if (items.length === 0) {
    return (
      <ContainerCenter>
        <EmptyText>
          Você ainda não escolheu nada 😞
          <ButtonBackHome onClick={() => navigate('/')}>
            Voltar para a loja
          </ButtonBackHome>
        </EmptyText>
      </ContainerCenter>
    );
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
              <DropdownQuantity
                quantityTotal={item.total_qty}
                quantity={item.qty}
                productId={item.product_id}
                token={user.token}
                setRenderCart={setRenderCart}
                renderCart={renderCart}
              />
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

const EmptyText = styled.h2`
  font-size: 32px;
  text-align: center;
  margin-top: 40%;
`;

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
  background: #ebebeb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  > div {
    display: flex;
    align-items: center;
    &:last-child {
      margin: 20px auto;
      @media (max-width: 600px) {
        width: 90%;
        justify-content: space-around;
      }
    }
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
