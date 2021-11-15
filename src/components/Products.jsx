import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { DebounceInput } from 'react-debounce-input';
import searchIcon from '../assets/icons/search.png';
import filterIcon from '../assets/icons/filter.png';
import { api, postCart } from '../services/api';
import { convertToBRL, throwError, throwSuccess } from '../services/utils';
import { useAuth } from '../contexts/AuthContext';
import ModalContext from '../contexts/ModalContext';

function Products() {
  const [products, setProducts] = useState([]);
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [order, setOrder] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const { search } = useLocation();

  const category = new URLSearchParams(search).get('category');
  const navigate = useNavigate();
  const { setModal } = useContext(ModalContext);
  const { user, logout } = useAuth();

  useEffect(() => {
    let query = category ? `?category=${category}` : '';

    if (order && category) {
      query += `&order=${order}`;
    } else if (order && !category) {
      query = `?order=${order}`;
    }

    if ((productSearch && order) || (productSearch && category)) {
      query += `&search=${productSearch}`;
    } else if (productSearch) {
      query = `?search=${productSearch}`;
    }

    api
      .get(`/products${category || query ? query : ''}`)
      .then((response) => setProducts(response.data));
  }, [category, order, productSearch]);

  const handleClickOutside = () => {
    setTimeout(() => setFilterDropdown(false), 110);
  };

  const handleAddCart = (productId) => {
    if (user) {
      postCart(productId, 1, user.token)
        .then(() => throwSuccess('Adicionado!'))
        .catch((error) => {
          if (error.response.status === 400) {
            throwError('Quantidade maxima atingida.');
          } else if (error.response.status === 401) {
            logout();
          }
        });
    } else setModal('sign-in');
  };

  return (
    <ProductSection>
      <Title>Produtos</Title>
      <Search>
        <SearchBar
          placeholder="Pesquise aqui"
          minLength={2}
          debounceTimeout={100}
          value={productSearch}
          onChange={(event) => setProductSearch(event.target.value)}
        />
        <SearchButton>
          <img src={searchIcon} alt="Pesquisar" />
        </SearchButton>
        <FilterButton
          onBlur={handleClickOutside}
          onClick={() => {
            if (!filterDropdown) {
              setFilterDropdown(true);
            }
          }}
        >
          <img src={filterIcon} alt="Filtrar" />
          <span>Filtro</span>
        </FilterButton>
        <Dropdown>
          <DropdownContent enabled={filterDropdown ? 1 : 0}>
            <DropwdownOption
              onClick={() => {
                setOrder('price');
                setFilterDropdown(false);
              }}
            >
              Maior preço
            </DropwdownOption>

            <DropwdownOption
              onClick={() => {
                setOrder('-price');
                setFilterDropdown(false);
              }}
            >
              Menor preço
            </DropwdownOption>
          </DropdownContent>
        </Dropdown>
      </Search>

      <ProductsDisplay>
        {products.length > 0
          ? products.map((product) => (
            <Product key={product.id}>
              <ProductImg
                onClick={() => navigate(`/product/${product.id}`)}
                src={product.imageUrl}
              />
              <ProductInfo>
                {product.total_qty <= 0 ? (
                  <SoldOff>Esgotado</SoldOff>
                ) : (
                  <>
                    <Name>{product.name}</Name>
                    <Value>
                      {convertToBRL(product.value)}
                    </Value>
                    <AddToCart onClick={() => handleAddCart(product.id)}>
                      Adicionar ao carrinho
                    </AddToCart>
                  </>
                )}
              </ProductInfo>
            </Product>
          ))
          : <Loader type="ThreeDots" color="#FFFFFF" height={25} width={100} />}
      </ProductsDisplay>
    </ProductSection>
  );
}

const ProductSection = styled.main`
  width: 100%;
  padding: 5%;
`;

const Title = styled.p`
  font-family: 'Saira Stencil One', sans-serif;
  font-size: 50px;
  margin-bottom: 15px;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const Search = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
`;

const SearchBar = styled(DebounceInput)`
  width: 83%;
  height: 35px;
  background-color: #ebebeb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  border: 0px;
  margin: 0px;
  padding: 0px 0px 0px 10px;
  font-family: 'Quicksand', sans-serif;
  font-size: 15px;

  :focus {
    outline: none;
  }

  @media (max-width: 600px) {
    width: 70%;
  }
`;

const SearchButton = styled.button`
  width: 5%;
  height: 35px;
  background: #ebebeb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  border: 0px;
  margin: 0px;
  padding: 0px;
  margin-left: 2%;
  cursor: pointer;

  @media (max-width: 1000px) {
    width: 15%;
  }
`;

const FilterButton = styled.button`
  width: 8%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #ebebeb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  border: 0px;
  margin: 0px;
  padding: 0px;
  margin-left: 2%;
  font-size: 18px;
  cursor: pointer;

  span {
    font-family: 'Quicksand', sans-serif;
  }

  @media (max-width: 1000px) {
    width: 15%;

    span {
      display: none;
    }
  }
`;

const Dropdown = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
`;

const DropdownContent = styled.div`
  width: 7.5vw;
  height: 60px;
  background-color: #ebebeb;
  border-radius: 22px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  display: ${(props) => (props.enabled ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  right: 5vw;
  top: 100%;
  z-index: 1;

  && p {
    display: block;
  }

  @media (max-width: 1000px) {
    width: 12vw;
  }

  @media (max-width: 600px) {
    width: 28vw;
  }
`;

const DropwdownOption = styled.p`
  height: 30%;
  font-size: 1vw;
  font-weight: bold;
  text-align: center;
  color: black;
  cursor: pointer;

  @media (max-width: 1000px) {
    font-size: 1.5vw;
  }

  @media (max-width: 600px) {
    font-size: 3vw;
  }
`;

const ProductsDisplay = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5%;

  * {
    font-family: 'Quicksand', sans-serif;
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Product = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #ebebeb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;

  :hover {
    button {
      width: 100%;
      height: 35px;
      color: white;
      margin-left: 0px;
    }
  }
`;

const ProductImg = styled.img`
  cursor: pointer;
  width: 100%;
`;

const ProductInfo = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  min-height: 130px;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  margin-top: 15px;
`;

const SoldOff = styled.div`
  width: 90%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f66565;
  color: white;
  margin: 0px 0px 0px 5%;
  border-radius: 22px;
  font-size: 25px;
  font-weight: 500;
`;

const Name = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
  color: black;
`;

const Value = styled.p`
  font-size: 30px;
  font-weight: 600;
  color: #1382e9;
  margin-bottom: 15px;
`;

const AddToCart = styled.button`
  width: 90%;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0px;
  margin-left: 5%;
  height: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #43ff4a;
  border-radius: 22px;
  color: transparent;
  font-size: 1.5vw;
  font-weight: 600;
  transition: all 0.2s;
  border: 0px;
  padding: 0px;
  cursor: pointer;

  @media (max-width: 1000px) {
    font-size: 2.2vw;
  }

  @media (max-width: 600px) {
    font-size: 3.5vw;
  }

  @media (max-width: 400px) {
    font-size: 7vw;
  }
`;

export default Products;
