import React from 'react';
import styled from 'styled-components';
import background from '../assets/bannerBackground.png';

function Banner() {
  return (
    <BannerSection id="banner">
      <div id="centro">
        <div className="cena" id="cena">
          <div className="d6" id="d6">
            <div className="face nao-selecionavel primeira">
              <img draggable="false" className="cube-img" src="Assets/Banner/1.svg" alt="cube" />
            </div>
            <div className="face nao-selecionavel segunda">
              <img draggable="false" className="cube-img" src="Assets/Banner/2.svg" alt="cube" />
            </div>
            <div className="face nao-selecionavel terceira">
              <img draggable="false" className="cube-img" src="Assets/Banner/3.svg" alt="cube" />
            </div>
            <div className="face nao-selecionavel quarta">
              <img draggable="false" className="cube-img" src="Assets/Banner/4.svg" alt="cube" />
            </div>
            <div className="face nao-selecionavel quinta">
              <img draggable="false" className="cube-img" src="Assets/Banner/5.svg" alt="cube" />
            </div>
            <div className="face nao-selecionavel sexta">
              <img draggable="false" className="cube-img" src="Assets/Banner/6.svg" alt="cube" />
            </div>
          </div>
        </div>
        <p className="title nao-selecionavel">
          A maior loja de cubos da
          <br />
          {' '}
          América Latina
        </p>
      </div>
    </BannerSection>
  );
}

const BannerSection = styled.section`
  width: 100%;
  height: 500px;
  margin-top: 100px;
  background-image: url(${background});
  background-position: center;

  @media (max-width: 600px) {
    height: 300px;
  }
`;

export default Banner;
