import styled from 'styled-components';

export default styled.input`
  font-family: 'Quicksand', sans-serif;
  outline: none;
  height: 35px;
  width: 100%;
  background-color: #ebebeb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  border: 0px;
  margin: 0px;
  padding-left: 20px;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;

  @media (max-width: 350px) {
    border-radius: 0px;
  }

  &::placeholder {
    color: black;
  }

  &:invalid:not([value=""]) {
    box-shadow: 0px 2px 4px rgba(216, 18, 18, 0.76);
  }

  &:valid {
    box-shadow: 0px 2px 4px rgba(20, 143, 16, 0.808);
  }
`;
