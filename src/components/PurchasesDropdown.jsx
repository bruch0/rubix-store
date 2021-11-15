import React, { useState } from 'react';
import styled from 'styled-components';
import InputForm from './InputForm';
import { convertToBRL } from '../services/utils';

export default function PurchasesDropdown({ purchase }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContainer>
      {isOpen || (
        <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
          <HeaderContainer>
            <h3>Número do pedido</h3>
            <p>{purchase.id}</p>
          </HeaderContainer>
          <HeaderContainer>
            <h3>Data</h3>
            <p>XX/11/2021</p>
          </HeaderContainer>
          <HeaderContainer>
            <h3>Total</h3>
            <p>{convertToBRL(purchase.total_value)}</p>
          </HeaderContainer>
          <HeaderContainer>
            <h4>Ver mais</h4>
          </HeaderContainer>
        </DropdownHeader>
      )}
      {isOpen && (
        <DropdownListContainer onClick={() => setIsOpen(!isOpen)}>
          <HeaderListItem>
            <h3>Nome do produto</h3>
            <h3>Quantidade</h3>
            <h3>Valor</h3>
          </HeaderListItem>
          {purchase.bought_products.map((item) => (
            <ListItem key={item.product_id}>
              AAAA
            </ListItem>
          ))}
        </DropdownListContainer>
      )}
    </DropdownContainer>
  );
}

const HeaderListItem = styled.div`
  display: flex;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 23px;
  h4 {
    margin: auto 0;
    color: #737070;
    font-weight: bold;
  }
  h3 {
    font-weight: bold;
    margin-bottom: 10px;
  }
  p {
    font-weight: 500;
  }
  &:nth-child(3) {
    p {
      color: #1382e9;
      font-weight: bold;
    }
  }
  @media (max-width: 600px) {
    font-size: 18px;
  }
  @media (max-width: 450px) {
    flex-direction: row;
    h4 {
      margin: 0 auto;
    }
  }
`;

const DropdownContainer = styled.div``;
const DropdownHeader = styled.div`
  background-color: #ebebeb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  padding: 18px 5%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  cursor: pointer;
  @media (max-width: 450px) {
    flex-direction: column;
  }
`;
const DropdownListContainer = styled.div`
  background-color: #EBEBEB;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
`;
const DropdownList = styled.ul``;
const ListItem = styled.li``;
