import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCart } from '../../services/api';
import { convertToBRL } from '../../services/utils.js';
import ContainerCenter from '../../components/ContainerCenter';
import { useAuth } from '../../contexts/AuthContext';
import DropdownQuantity from '../../components/DropdownQuantity';

export default function User() {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
  }, []);

  if (loading) return <h1>CARREGANDO... CRIAR ALGO</h1>;

  return (
    <ContainerCenter>
      KKKKKKKKKk
    </ContainerCenter>
  );
}
