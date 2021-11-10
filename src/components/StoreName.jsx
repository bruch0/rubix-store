import styled from 'styled-components';
import Kaftus from '../assets/fonts/Kaftus.ttf';

export default styled.p`
  font-size: 30px;
  margin-left: 15px;
  font-family: 'Kaftus';

  &::before {
    content: "Rubix Store";
  }

  @font-face {
    src: url(${Kaftus}) format('truetype');
    font-family: Kaftus;
  }

  @media (max-width: 600px) {
    margin-left: 5px;
    font-size: 4vw;
  }
`;
