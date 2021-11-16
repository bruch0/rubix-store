import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import cart from '../assets/icons/cart.png';
import SignUpModal from './modals/SignUpModal';
import SignInModal from './modals/SignInModal';
import PasswordRecoverModal from './modals/PasswordRecover';
import StoreName from './StoreName';
import { ReactComponent as UserIcon } from '../assets/icons/user.svg';
import { ReactComponent as LogoIcon } from '../assets/icons/logo.svg';
import { useAuth } from '../contexts/AuthContext';
import ModalContext from '../contexts/ModalContext';

function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setModal } = useContext(ModalContext);

  const categories = [
    { icon: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/241/323/products/2x2x2-qiyi-qidi-preto11-28ffb53d0f795f166215376389639052-640-0.jpg', name: '2x2x2' },
    { icon: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/241/323/products/3x3x3-gan-356-rs-stickerless-21-453c6f1597a426a40c15842162015143-640-0.jpg', name: '3x3x3' },
    { icon: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/241/323/products/cubo-magico-4x4x4-qiyi-qiyuan-w-preto-casa-do-cubo-11-1e4484572f07e5966616209367005015-640-0.jpg', name: '4x4x4' },
    { icon: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/241/323/products/cubo-magico-5x5x5-yuxin-cloud-stickerless-casa-do-cubo-11-96685b895291e1c27616154017087417-640-0.jpg', name: '5x5x5' },
    { icon: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/241/323/products/9x9-moyu-mf9-preto11-632a4e616b61b0a1fa15382523536421-640-0.jpg', name: 'BigCubes' },
    { icon: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/241/323/products/cubo-magico-pyraminx-qiyi-qiming-a-preto-11-2fab95c94f1f8fdcd615959466215283-640-0.jpg', name: 'Pyraminx' },
    { icon: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/241/323/products/cubo-magico-megaminx-moyu-yj-yuhu-m-stickerless-11-7c8a3fff7f548b0aac15992398088482-50-0.jpg', name: 'Megaminx' },
    { icon: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/241/323/products/qichengapreto11-4f7eef7b2ac661b23d14992937140231-640-0.jpg', name: 'Skewb' },
    { icon: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/241/323/products/timer11-03eee93f806cbdeb7415132909669947-640-0.jpg', name: 'Especial' },
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
      <SignInModal />
      <SignUpModal />
      <PasswordRecoverModal />
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
