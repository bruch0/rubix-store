import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as DownArrowIcon } from '../assets/icons/down-arrow.svg';
import { ReactComponent as UpArrowIcon } from '../assets/icons/up-arrow.svg';
import { ReactComponent as TrashIcon } from '../assets/icons/trash.svg';
import InputForm from './InputForm';
import { postCart } from '../services/api';

export default function DropdownQuantity({
  quantity,
  quantityTotal,
  productId,
  token,
  setRenderCart,
  renderCart,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputNewQty, setInputNewQty] = useState('');

  function handleChangeQty(newQty) {
    postCart(productId, newQty, token, true).then(() => {
      setIsOpen(false);
      setRenderCart(!renderCart);
    });
  }

  return (
    <>
      <Dropdown>
        <SelectedItem
          isOpen={isOpen}
          onClick={() => {
            if (inputNewQty !== '' && isOpen) {
              handleChangeQty(inputNewQty);
              setInputNewQty('');
            }
            setIsOpen(!isOpen);
          }}
        >
          <QtyNumber>{quantity}</QtyNumber>
          {isOpen ? <UpArrow /> : <DownArrow />}
        </SelectedItem>
        <ContainerItems isOpen={isOpen}>
          {[...Array(quantityTotal > 5 ? 5 : quantityTotal).keys()].map((n) => (
            <Item key={n} onClick={() => handleChangeQty(n + 1)}>
              <QtyNumber>{n + 1}</QtyNumber>
            </Item>
          ))}
          {quantityTotal > 5 && (
            <LastItem>
              <p>Quantidade</p>
              <InputQty
                value={inputNewQty}
                type="number"
                onChange={(e) => setInputNewQty(e.target.value)}
              />
              {inputNewQty > quantityTotal && (
                <NotAvailableText>Não disponível</NotAvailableText>
              )}
            </LastItem>
          )}
        </ContainerItems>
      </Dropdown>
      <Trash onClick={() => handleChangeQty(0)} />
    </>
  );
}

const NotAvailableText = styled.p`
  color: #f66565;
  font-size: 14px !important;
`;

const Trash = styled(TrashIcon)`
  cursor: pointer;
`;

const InputQty = styled(InputForm)`
  background: #ffffff;
  height: 30px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  margin-top: 5px;
  margin-bottom: 5px;
  &:valid {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  }
`;

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
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  p {
    font-size: 16px;
    margin: 0 auto;
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
  margin-right: 25px;
  * {
    transition: none;
  }
`;
