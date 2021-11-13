/* eslint-disable no-restricted-globals */
import React, { useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import Logo from '../Logo';
import StoreName from '../StoreName';
import InputForm from '../InputForm';
import '../../shared/styles/modal.css';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import ButtonForm from '../ButtonForm';
import { requestPasswordEmail } from '../../services/api';
import { throwError, throwSuccess } from '../../services/utils';
import ModalContext from '../../contexts/ModalContext';

export default function PasswordRecoverModal() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { modal, setModal } = useContext(ModalContext);

  function submit(event) {
    event.preventDefault();
    if (email.length < 5) {
      throwError('Insira um email válido');
      return;
    }
    setIsLoading(true);
    requestPasswordEmail(email)
      .then(() => {
        throwSuccess('Email enviado!');
        setModal(null);
        setEmail('');
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          throwError('E-mail inválido');
        } else if (error.response.status === 404) {
          throwError('E-mail não encontrado');
        }
        setIsLoading(false);
      });
  }

  return (
    <Popup open={modal === 'password'} modal closeOnDocumentClick={false}>
      <ContainerPassword>
        <CloseButton onClick={() => setModal(null)}>
          <CloseIcon />
        </CloseButton>
        <form onSubmit={submit}>
          <div>
            <Logo />
            <StoreName />
            <h2>Recupere sua senha</h2>
            <InputForm
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <ButtonForm
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Enviar email de recuperação
            </ButtonForm>
          </div>
        </form>
      </ContainerPassword>
    </Popup>
  );
}

const ContainerPassword = styled.div`
  position: relative;
  background-color: #ffffff;
  width: 600px;
  height: 400px;
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
