import React from 'react';
import './hero.css';
import FormField from '../formField/FormField';
const Hero = () => {
  return (
    <section className="section hero " data-section>
      <div className="container">
        <div className="hero-content">
          <h1 className="h1 hero-title">
            Buy & Sell Digital Assets In The Crypto
          </h1>

          <p className="hero-text">
            Coin Cryptex is the easiest, safest, and fastest way to buy & sell
            crypto asset exchange.
          </p>

          <a href="#" className="btn btn-primary">
            Get started now
          </a>
        </div>
        <FormField />
      </div>
    </section>
  );
};

export default Hero;
