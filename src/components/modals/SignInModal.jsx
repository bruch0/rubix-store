import React, { useContext, useState } from 'react';
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
import { postSignIn } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { throwError } from '../../services/utils';
import ModalContext from '../../contexts/ModalContext';

export default function SignInModal() {
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { modal, setModal } = useContext(ModalContext);

  function submit(event) {
    event.preventDefault();
    if (email.length < 5) {
      throwError('Insira um e-mail válido');
      return;
    } if (password.length < 8) {
      throwError('Senhas contém no mínimo 8 caractéres');
    }
    setIsLoading(true);
    postSignIn(email, password)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        setIsLoading(false);
        setModal(null);
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          confirmButtonColor: '#1382e9',
          text: 'Usuário ou senha inválidos',
        });
        setIsLoading(false);
      });
  }

  return (
    <Popup open={modal === 'sign-in'} modal closeOnDocumentClick={false}>
      <ContainerLogin>
        <CloseButton onClick={() => setModal(null)}>
          <CloseIcon />
        </CloseButton>
        <form onSubmit={submit}>
          <div>
            <Logo />
            <StoreName />
            <h2>Entre na sua conta</h2>
            <InputForm
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputPassContainer>
              <InputForm
                placeholder="Senha"
                type={showPass || 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!showPass ? (
                <HidePassIcon onClick={() => setShowPass(!showPass)} />
              ) : (
                <ShowPassIcon onClick={() => setShowPass(!showPass)} />
              )}
            </InputPassContainer>
            <ModalLink onClick={() => setModal('password')}>Esqueceu sua senha?</ModalLink>
          </div>
          <div>
            <ButtonForm
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Entrar
            </ButtonForm>
            <ModalLink onClick={() => setModal('sign-up')}>
              Cadastre-se
            </ModalLink>
          </div>
        </form>
      </ContainerLogin>
    </Popup>
  );
}

const ModalLink = styled.p`
  font-weight: 500;
  cursor: pointer;
`;

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

const ContainerLogin = styled.div`
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
