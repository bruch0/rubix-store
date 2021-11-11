/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Logo from '../Logo';
import StoreName from '../StoreName';
import InputForm from '../InputForm';
import '../../shared/styles/modal.css';
import { ReactComponent as HidePassIcon } from '../../assets/icons/hide-pass.svg';
import { ReactComponent as ShowPassIcon } from '../../assets/icons/show-pass.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import ButtonForm from '../ButtonForm';
import { postSignUp } from '../../services/api';

export default function SignUpModal({ modal, setModal }) {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
    passwordRepeat: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const throwError = (title) => {
    Swal.fire({
      icon: 'error',
      confirmButtonColor: '#1382e9',
      text: title,
    });
  };

  function submit(event) {
    event.preventDefault();
    if (userInfo.username.length === 0) {
      throwError('Insira seu nome');
      return;
    } if (userInfo.username.length < 3) {
      throwError('Insira um nome válido');
      return;
    } if (userInfo.username.length < 3) {
      throwError('Insira um nome válido');
      return;
    } if (userInfo.email.length < 5) {
      throwError('Insira um e-mail válido');
      return;
    } if (userInfo.cpf.length < 11) {
      throwError('Insira um cpf válido');
      return;
    } if (userInfo.phone.length !== 11) {
      throwError('Insira um número válido');
      return;
    } if (userInfo.password.length < 8) {
      throwError('A senha deve conter no mínimo 8 dígitos');
      return;
    } if (userInfo.password !== userInfo.passwordRepeat) {
      throwError('As senhas não conferem');
      return;
    }
    setIsLoading(true);
    postSignUp(
      userInfo.username,
      userInfo.email,
      userInfo.password,
      userInfo.cpf,
      userInfo.phone,
    )
      .then(() => {
        Swal.fire({
          icon: 'success',
          confirmButtonColor: '#1382e9',
          text: 'Conta criada!',
        });
        setModal('sign-in');
        setUserInfo({
          username: '',
          email: '',
          cpf: '',
          phone: '',
          password: '',
          passwordRepeat: '',
        });
        setIsLoading(false);
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          confirmButtonColor: '#1382e9',
          text: 'Usuário já existe',
        });
        setIsLoading(false);
      });
  }

  return (
    <Popup open={modal === 'sign-up'} modal closeOnDocumentClick={false}>
      <ContainerSignUp>
        <CloseButton onClick={() => setModal(null)}>
          <CloseIcon />
        </CloseButton>
        <form onSubmit={submit}>
          <div>
            <Logo />
            <StoreName />
            <h2>Entre na sua conta</h2>
            <InputForm
              placeholder="Nome"
              type="text"
              value={userInfo.username}
              onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
            />
            <InputForm
              placeholder="E-mail"
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            />
            <InputForm
              placeholder="CPF"
              type="number"
              value={userInfo.cpf}
              onChange={(e) => setUserInfo({ ...userInfo, cpf: e.target.value })}
            />
            <InputForm
              placeholder="Telefone"
              type="number"
              value={userInfo.phone}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            />
            <InputPassContainer>
              <InputForm
                placeholder="Senha"
                type={showPass || 'password'}
                value={userInfo.password}
                onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
              />
              {!showPass ? (
                <HidePassIcon onClick={() => setShowPass(!showPass)} />
              ) : (
                <ShowPassIcon onClick={() => setShowPass(!showPass)} />
              )}
            </InputPassContainer>
            <InputForm
              placeholder="Repita a senha"
              type="password"
              value={userInfo.passwordRepeat}
              onChange={(e) => setUserInfo({ ...userInfo, passwordRepeat: e.target.value })}
            />
          </div>
          <div>
            <ButtonForm
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Cadastrar-se
            </ButtonForm>
            <ModalLink onClick={() => setModal('sign-in')}>
              Já possui uma conta? Cadastre-se
            </ModalLink>
          </div>
        </form>
      </ContainerSignUp>
    </Popup>
  );
}

const InputPassContainer = styled.div`
  position: relative;
  svg {
    cursor: pointer;
    position: absolute;
    width: 28px;
    height: 28px;
    top: 4px;
    right: 10px;
  }
`;

const ContainerSignUp = styled.div`
  position: relative;
  background-color: #ffffff;
  width: 600px;
  height: 600px;
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

const ModalLink = styled.p`
  cursor: pointer;
`;
