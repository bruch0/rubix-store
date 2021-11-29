import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
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
            <p>{dayjs(purchase.creation_date).format('DD/MM/YYYY')}</p>
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
      {isOpen ? (
        <DropdownListContainer onClick={() => setIsOpen(!isOpen ? 1 : 0)}>
          <HeaderListItem>
            <ColumnImage />
            <ColumnName>Nome do produto</ColumnName>
            <ColumnQuantity>Quantidade</ColumnQuantity>
            <ColumnValue>Valor</ColumnValue>
          </HeaderListItem>
          {purchase.boughtProducts.map((item) => (
            <MainContainerItem key={item.imgUrl}>
              <ListItem>
                <ColumnImage>
                  <img src={item.imgUrl} alt={item.name} />
                </ColumnImage>
                <ColumnName>{item.name}</ColumnName>
                <ColumnQuantity>{item.qty}</ColumnQuantity>
                <ColumnValueBlue>{convertToBRL(item.value)}</ColumnValueBlue>
              </ListItem>
              <ListItemMobile>
                <ColumnImage>
                  <img src={item.imageUrl} alt={item.name} />
                </ColumnImage>
                <ColumnName>{item.name}</ColumnName>
                <InfoQtyValueContainer>
                  <ColumnQuantity>
                    <p>Quantidade</p>
                    {item.qty}
                  </ColumnQuantity>
                  <ColumnValueBlue>
                    <p>Valor</p>
                    {convertToBRL(item.value)}
                  </ColumnValueBlue>
                </InfoQtyValueContainer>
              </ListItemMobile>
            </MainContainerItem>
          ))}
          <ListItemLast>
            <ColumnValue>Total</ColumnValue>
            <ColumnValueBlue>
              {convertToBRL(purchase.total_value)}
            </ColumnValueBlue>
          </ListItemLast>
        </DropdownListContainer>
      ) : (
        ''
      )}
    </DropdownContainer>
  );
}
const MainContainerItem = styled.div``;

const InfoQtyValueContainer = styled.div`
  display: flex;
  width: 100%;
  p {
    font-weight: bold;
  }
  font-size: 17px;
`;

const ListItemMobile = styled.div`
  display: none;
  border-bottom: 1px solid #686565;
  margin-bottom: 10px;
  padding: 5px 15px 15px 15px;
  width: 100%;
  @media (max-width: 500px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const ListItem = styled.div`
  font-weight: 500;
  font-size: 18px;
  display: flex;
  margin-bottom: 15px;
  @media (max-width: 500px) {
    display: none;
  }
`;

const ListItemLast = styled(ListItem)`
  justify-content: right;
  font-weight: bold;
  font-size: 22px;
  @media (max-width: 500px) {
    display: flex;
    margin: 15px 0px 10px 0;
  }
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColumnName = styled(CenterContainer)`
  width: 50%;
  margin-left: 15px;
  @media (max-width: 500px) {
    width: 83%;
    font-weight: bold;
  }
`;

const ColumnImage = styled(CenterContainer)`
  width: 10%;
  img {
    width: 60px;
    border-radius: 50%;
    margin-right: 5px;
    object-fit: cover;
  }
`;

const ColumnQuantity = styled(CenterContainer)`
  width: 20%;
  p {
    margin-right: 20px;
  }
  @media (max-width: 500px) {
    width: 50%;
  }
`;

const ColumnValue = styled(CenterContainer)`
  width: 20%;
  p {
    margin-right: 20px;
    color: black;
  }
  @media (max-width: 500px) {
    width: 50%;
  }
`;

const ColumnValueBlue = styled(ColumnValue)`
  color: #1382e9;
  font-weight: bold;
`;

const HeaderListItem = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  @media (max-width: 500px) {
    display: none;
  }
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
  @media (max-width: 500px) {
    flex-direction: row;
    h4 {
      margin: 0 auto;
    }
  }
`;

const DropdownContainer = styled.div`
  margin-bottom: 30px;
`;
const DropdownHeader = styled.div`
  background-color: #ebebeb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  padding: 18px 5%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  cursor: pointer;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
const DropdownListContainer = styled.div`
  background-color: #ebebeb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  padding: 10px;
`;
