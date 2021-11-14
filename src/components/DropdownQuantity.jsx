import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as DownArrowIcon } from '../assets/icons/down-arrow.svg';
import { ReactComponent as UpArrowIcon } from '../assets/icons/up-arrow.svg';

export default function DropdownQuantity({ quantity, quantityTotal }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown>
      <SelectedItem isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <QtyNumber>{quantity}</QtyNumber>
        {isOpen ? <UpArrow /> : <DownArrow />}
      </SelectedItem>
      <ContainerItems isOpen={isOpen}>
        {[...Array(quantityTotal > 5 ? 5 : quantityTotal).keys()].map((n) => (
          <Item key={n}>
            <QtyNumber>{n + 1}</QtyNumber>
          </Item>
        ))}
        {quantityTotal > 5 && <LastItem><p>Quantidade</p></LastItem>}
      </ContainerItems>
    </Dropdown>
  );
}

const QtyNumber = styled.p`
  margin: auto;
`;

const ContainerItems = styled.div`
  width: 100%;
  border-radius: 0px 0px 22px 22px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 40px;
  background-color: #ebebeb;
  z-index: 1;
  ${({ isOpen }) => (isOpen ? 'visibility: visible;' : 'visibility: collapse;')};
  ${({ isOpen }) => (isOpen ? 'height: auto;' : 'height: 0;')};
`;

const DownArrow = styled(DownArrowIcon)`
  width: 22px;
  margin-right: 10px;
`;

const UpArrow = styled(UpArrowIcon)`
  width: 22px;
  margin-right: 10px;
`;

const Item = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  border-top: 2px #d1cfcf solid;
`;

const LastItem = styled.div`
  border-radius: 0px 0px 22px 22px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  p {
    font-size: 16px;
    margin: 10px;
  }
`;

const SelectedItem = styled.div`
  height: 40px;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  ${({ isOpen }) => (isOpen ? 'border-radius: 22px 22px 0px 0px;' : 'border-radius: 22px;')};
  display: flex;
  justify-content: space-between;
`;

const Dropdown = styled.div`
  width: 120px;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  position: relative;
  * {
    transition: none;
  }
`;
