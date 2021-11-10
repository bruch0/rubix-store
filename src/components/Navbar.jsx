import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import cart from '../assets/icons/cart.png';
import categoryIcon from '../assets/icons/category.png';
import LoginPopUp from './LoginPopUp';
import StoreName from './StoreName';

function Navbar() {
  const categories = [
    { icon: categoryIcon, name: '2x2x2' },
    { icon: categoryIcon, name: '3x3x2' },
    { icon: categoryIcon, name: '4x4x4' },
    { icon: categoryIcon, name: '5x5x5' },
    { icon: categoryIcon, name: 'BigCubes' },
    { icon: categoryIcon, name: 'Pyraminx' },
    { icon: categoryIcon, name: 'Megaminx' },
    { icon: categoryIcon, name: 'Skewb' },
    { icon: categoryIcon, name: 'Especial' },
  ];

  return (
    <Nav>
      <StoreOptions>
        <Store to="/">
          <LogoNavBar src="Assets/Banner/6.svg" alt="logo" />
          <StoreName />
        </Store>
        <Options>
          <Cart to="cart">
            <img src={cart} alt="cart" />
          </Cart>
          <Action><LoginPopUp text="Login" /></Action>
          <Action>Cadastre-se</Action>
        </Options>
      </StoreOptions>
      <Categories>
        {categories.map((category) => (
          <Category key={category.name} to={`/?category=${category.name}`}>
            <img src={category.icon} alt={category.name} />
            <p>{category.name}</p>
          </Category>
        ))}
      </Categories>
    </Nav>
  );
}

const Nav = styled.nav`
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 0px 2%;
  background-color: #FFFFFF;
`;

const StoreOptions = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Store = styled(Link)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
  color: black;

  :visited {
      color: black
  }
`;

const LogoNavBar = styled.img`
  height: 80%;

  @media (max-width: 600px) {
    height: 60%;
  }
`;

const Options = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-left: 15px;
  }
`;

const Cart = styled(Link)`
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Action = styled.p`
  font-family: 'Quicksand', sans-serif;
  font-size: 20px;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: 3vw;
  }
`;

const Categories = styled.div`
  width: 100%;
  height: 50%;
  padding: 5px 10%;
  display: flex;
  justify-content: space-between;
  
  @media (max-width: 1000px) {
      padding: 5px 5%;
    }

  @media (max-width: 600px) {
      justify-content: unset;
      padding: 5px 0%;
      overflow-x: scroll;
    }
`;

const Category = styled(Link)`
  width: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  color: black;

:visited {
    color: black
}
  
  img {
    width: 30px;
  }

  @media (max-width: 1000px) {
    font-size: 2vw;
  }

  @media (max-width: 600px) {
    margin-right: 25px;
    font-size: 12px;
  }
`;

export default Navbar;
