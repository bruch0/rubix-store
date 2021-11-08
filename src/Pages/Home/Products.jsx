import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import searchIcon from '../../Assets/Icons/search.png';
import filterIcon from '../../Assets/Icons/filter.png';

function Products() {
  const [products, setProducts] = useState([]);
  const { search } = useLocation();
  const category = new URLSearchParams(search).get('category');

  useEffect(() => {
    const query = category ? `?category=${category}` : '';
    axios
      .get(`http://localhost:4000/products${category ? query : ''}`)
      .then((response) => setProducts(response.data));
  }, [category]);
  return (
    <ProductSection>
      <Title>Produtos</Title>
      <Search>
        <SearchBar placeholder="Pesquise aqui" />
        <SearchButton>
          <img src={searchIcon} alt="Pesquisar" />
        </SearchButton>
        <FilterButton>
          <img src={filterIcon} alt="Pesquisar" />
          <span>Filtro</span>
        </FilterButton>
      </Search>

      <ProductsDisplay>
        {products.length > 0
          ? products.map((product) => (
            <Product to={`/product/${product.id}`} key={product.id}>
              <ProductImg src={searchIcon} />
              <ProductInfo>
                {product.total_qty === 0 ? (
                  <SoldOff>
                    Esgotado
                  </SoldOff>
                ) : (
                  <>
                    <Name>{product.name}</Name>
                    <Value>
                      {(product.value / 100).toString().replace('.', ',')}
                    </Value>
                    <AddToCart>
                      Adicionar ao carrinho
                    </AddToCart>
                  </>
                )}
              </ProductInfo>
            </Product>
          ))
          : ''}
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

const SearchBar = styled.input`
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

const Product = styled(Link)`
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
  width: 100%;
`;

const ProductInfo = styled.div`
  display: flex;
  height: 100%;
  min-height: 100px;
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
    background-color: #F66565;
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
    margin: 0px;
    margin-left: 5%;
    height: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #43FF4A;
    border-radius: 22px;
    color: transparent;
    font-size: 25px;
    font-weight: 600;
    transition: all .2s;
    border: 0px;
    padding: 0px;
    cursor: pointer;
`;

export default Products;
