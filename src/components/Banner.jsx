import React, { useState } from 'react';
import styled from 'styled-components';

function Banner() {
  const [dragStatus, setDragStatus] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const transform = `rotateX(${position.y}deg) rotateY(${position.x}deg)`;
  return (
    <BannerSection
      onMouseDown={() => setDragStatus(true)}
      onMouseUp={() => setDragStatus(false)}
      onMouseMove={(e) => {
        if (dragStatus) {
          setPosition({ x: e.clientX, y: e.clientY });
        }
      }}
    >
      <Cube>
        <Center>
          <Scene>
            <Dice roll={transform}>
              <Face>
                <img src="Assets/Banner/1.svg" alt="dice face" />
              </Face>
              <Face>
                <img src="Assets/Banner/2.svg" alt="dice face" />
              </Face>
              <Face>
                <img src="Assets/Banner/3.svg" alt="dice face" />
              </Face>
              <Face>
                <img src="Assets/Banner/4.svg" alt="dice face" />
              </Face>
              <Face>
                <img src="Assets/Banner/5.svg" alt="dice face" />
              </Face>
              <Face>
                <img src="Assets/Banner/6.svg" alt="dice face" />
              </Face>
            </Dice>
          </Scene>
        </Center>
      </Cube>
    </BannerSection>
  );
}

const BannerSection = styled.section`
  width: 100%;
  height: 500px;
  background-image: url('Assets/Banner/background.png');
  background-position: center;
`;

const Cube = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 20;

  * {
    transition: 0.2s;
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Scene = styled.div`
  width: 257px;
  height: 257px;
  perspective: 800px;
  background-color: transparent;
`;

const Dice = styled.div.attrs((props) => ({
  transform: props.roll,
}))`
  position: relative;
  transform-style: preserve-3d;
  background-color: transparent;
`;

const Face = styled.div`
  position: absolute;

  :nth-child(1) {
    transform: translateZ(100px);
  }
  :nth-child(2) {
    transform: translateZ(-100px);
  }
  :nth-child(3) {
    transform: rotateY(90deg) translateZ(100px);
  }
  :nth-child(4) {
    transform: rotateY(90deg) translateZ(-100px);
  }
  :nth-child(5) {
    transform: rotateX(90deg) translateZ(100px);
  }
  :nth-child(6) {
    transform: rotateX(90deg) translateZ(-100px);
  }
`;

export default Banner;
