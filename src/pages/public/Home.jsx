import React from 'react';
import Products from '../../components/Products';
import Banner from '../../components/Banner';

function Home({ setModal }) {
  return (
    <>
      <Banner />
      <Products setModal={setModal} />
    </>
  );
}

export default Home;
