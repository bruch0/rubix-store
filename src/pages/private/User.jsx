import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserInfo } from '../../services/api';
import { convertToBRL } from '../../services/utils.js';
import ContainerCenter from '../../components/ContainerCenter';
import { useAuth } from '../../contexts/AuthContext';

export default function User() {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
    getUserInfo(user.token)
      .then((res) => {
        setUserInfo(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) return <h1>CARREGANDO... CRIAR ALGO</h1>;

  const ToPhoneString = (value) => `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 12)}`;

  const ToCpfString = (value) => `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 12)}`;

  return (
    <ContainerCenter>
      <SectionTitle>Meus dados</SectionTitle>
      <PersonalInfoContainer>
        <InfoContainer>
          <InfoTitle>Nome</InfoTitle>
          <InfoInput width="400px">{userInfo.name}</InfoInput>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>CPF</InfoTitle>
          <InfoInput width="200px">{ToCpfString(userInfo.cpf)}</InfoInput>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>Telefone</InfoTitle>
          <InfoInput width="200px">{ToPhoneString(userInfo.phone)}</InfoInput>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>E-mail</InfoTitle>
          <InfoInput width="400px">{userInfo.email}</InfoInput>
        </InfoContainer>
      </PersonalInfoContainer>
      <SectionTitle>Meus pedidos</SectionTitle>
    </ContainerCenter>
  );
}

const InfoInput = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  ${({ width }) => `width: ${width};`}
  height: 30px;
  padding: 6px 20px;
  font-size: 20px;
  margin-right: 10px;
  @media (max-width: 430px) {
    max-width: 300px;
  }
`;

const InfoTitle = styled.h3`
  font-weight: 500;
  font-size: 20px;
  margin: 0px 0px 5px 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: auto;
`;

const SectionTitle = styled.h1`
  font-weight: 500;
  font-size: 32px;
  margin: 10px;
  margin-top: 30px;
`;

const PersonalInfoContainer = styled.div`
  max-width: 900px;
  background-color: #ebebeb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  display: flex;
  flex-wrap: wrap;
  padding: 15px 0px 10px 15px;
`;
