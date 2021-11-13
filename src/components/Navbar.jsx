import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import cart from '../assets/icons/cart.png';
import categoryIcon from '../assets/icons/category.png';
import SignUpModal from './modals/SignUpModal';
import SignInModal from './modals/SignInModal';
import StoreName from './StoreName';
import { ReactComponent as UserIcon } from '../assets/icons/user.svg';
import { ReactComponent as LogoIcon } from '../assets/icons/logo.svg';
import { useAuth } from '../contexts/AuthContext';
import ModalContext from '../contexts/ModalContext';

function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { modal, setModal } = useContext(ModalContext);

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
          <LogoNavBar alt="Rubix Store Logo" />
          <StoreName />
        </Store>
        <Options>
          <Cart
            src={cart}
            alt="cart"
            onClick={() => {
              if (!user) setModal('sign-in');
              else navigate('/cart');
            }}
          />
          {user ? (
            <UserIcon onClick={() => navigate('/user')} />
          ) : (
            <Action>
              <ModalLink onClick={() => setModal('sign-in')}>
                Entrar
              </ModalLink>
              <ModalLink onClick={() => setModal('sign-up')}>
                Cadastre-se
              </ModalLink>
            </Action>
          )}
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
      <SignInModal modal={modal} setModal={setModal} />
      <SignUpModal modal={modal} setModal={setModal} />
    </Nav>
  );
}

const ModalLink = styled.p`
  &:hover{
    border-bottom: 2px #000 solid;
  }
`;

const Nav = styled.nav`
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 0px 2%;
  background-color: #ffffff;
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
    color: black;
  }
`;

const LogoNavBar = styled(LogoIcon)`
  width: 40px;
  @media (max-width: 600px) {
    height: 60%;
  }
`;

const Options = styled.div`
  display: flex;

  svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  > * {
    margin-left: 15px;
  }
`;

const Cart = styled.img`
  height: 25px;
  height: 25px;
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Action = styled.div`
  display: flex;
  font-family: 'Quicksand', sans-serif;
  font-size: 20px;
  cursor: pointer;
  margin-top: 5px;
  p:first-child {
    margin-right: 10px;
  }

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
    color: black;
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
