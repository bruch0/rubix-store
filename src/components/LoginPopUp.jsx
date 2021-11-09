import React from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';

export default ({ text }) => (
  // eslint-disable-next-line react/button-has-type
  <Popup trigger={<p>{text}</p>} modal>
    <ContainerLogin> TESTE </ContainerLogin>
  </Popup>
);

const ContainerLogin = styled.div`
    background-color:#FFFFFF;
    width: 600px;
    height: 500px;
    padding: 10px;
    border-radius: 37px;
    color: #000;
`;
