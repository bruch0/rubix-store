import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import Logo from './Logo';
import '../shared/styles/modal.css';
import StoreName from './StoreName';
import InputForm from './InputForm';
import { ReactComponent as HidePassIcon } from '../assets/icons/hide-pass.svg';
import { ReactComponent as ShowPassIcon } from '../assets/icons/show-pass.svg';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import ButtonForm from './ButtonForm';

export default function LoginPopUp({ text }) {
  // eslint-disable-next-line react/button-has-type

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  function submit(event) {
    event.preventDefault();
    setIsLoading(true);
  }

  return (
    <Popup trigger={<p>{text}</p>} modal>
      {(close) => (
        <ContainerLogin>
          <CloseButton onClick={() => close()}>
            <CloseIcon />
          </CloseButton>
          <form onSubmit={submit}>
            <div>
              <Logo />
              <StoreName />
              <h2>Entre na sua conta</h2>
              <InputForm
                required
                placeholder="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputPassContainer>
                <InputForm
                  required
                  placeholder="Senha"
                  type={showPass || 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!showPass ? (
                  <HidePassIcon onClick={() => setShowPass(true)} />
                ) : (
                  <ShowPassIcon onClick={() => setShowPass(false)} />
                )}
              </InputPassContainer>
              <h3>Esqueceu sua senha?</h3>
            </div>
            <div>
              <ButtonForm type="submit" isLoading={isLoading}>
                Entrar
              </ButtonForm>
              <h3>Cadastre-se</h3>
            </div>
          </form>
        </ContainerLogin>
      )}
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
    bottom: 6px;
    right: 10px;
  }
`;

const ContainerLogin = styled.div`
  position: relative;
  background-color: #ffffff;
  width: 600px;
  height: 500px;
  padding: 20px;
  border-radius: 37px;
  color: #000;
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
    svg {
      margin-top: 30px;
      margin-bottom: 7px;
    }
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
