import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authorizeRecover, changePassword } from '../../services/api';
import Logo from '../../components/Logo';
import StoreName from '../../components/StoreName';
import InputForm from '../../components/InputForm';
import ButtonForm from '../../components/ButtonForm';
import { throwError, throwSuccess } from '../../services/utils.js';

function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(search).get('token');

  if (!token) {
    navigate('/');
  }

  useEffect(() => {
    authorizeRecover(token)
      .then((response) => {
        setEmail(response.data.userEmail);
      })
      .catch((error) => {
        if (error.response.status === 408) {
          throwError('Token expirado');
        }
        if (error.response.status === 404) {
          throwError('Token inválido');
        }
        navigate('/');
      });
  }, []);

  const requestChange = () => {
    setLoading(true);
    changePassword(email, newPassword)
      .then(() => {
        throwSuccess('Senha trocada com sucesso');
        setLoading(false);
        navigate('/');
      })
      .catch(() => {
        throwError('Não foi possível alterar sua senha');
        setLoading(false);
      });
  };

  return (
    <PasswordRoute>
      <div>
        <Logo />
        <StoreName />
      </div>
      <InputForm
        placeholder="Nova senha"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        onKeyUp={(keyboard) => {
          if (keyboard.nativeEvent.target === 'Enter') {
            requestChange();
          }
        }}
      />
      <ButtonForm isLoading={loading ? 1 : 0} onClick={requestChange}>
        Trocar senha
      </ButtonForm>
    </PasswordRoute>
  );
}

const PasswordRoute = styled.main`
  width: 100%;
  height: 500px;
  padding: 5%;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export default RecoverPassword;
