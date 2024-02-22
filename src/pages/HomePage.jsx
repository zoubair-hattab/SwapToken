import React from 'react';
import Hero from '../components/home/hero/Hero';
import Trend from '../components/home/trend/Trend';
import TokenList from '../components/token/TokenList';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Trend />
      <TokenList />
    </>
  );
};

export default HomePage;
