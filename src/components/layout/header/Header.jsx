import React, { useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
const Header = () => {
  const [activeHeader, setActiveHeader] = useState(false);
  const [activeNavbar, setActiveNavbar] = useState(false);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 70) {
      setActiveHeader(true);
    } else {
      setActiveHeader(false);
    }
  });
  return (
    <header className={`header ${activeHeader && 'active'}`}>
      <div className="container">
        <Link to="#" className="logo">
          <img
            src="https://codewithsadee.github.io/cryptex/assets/images/logo.svg"
            alt="crypto log"
            width={32}
            height={32}
          />
          crypto
        </Link>
        <nav className={`navbar ${activeNavbar && 'active'}`}>
          <ul className="navbar-list">
            <li className="navbar-item" onClick={() => setActiveNavbar(false)}>
              <Link to="/" className="navbar-link">
                Home
              </Link>
            </li>

            <li className="navbar-item" onClick={() => setActiveNavbar(false)}>
              <Link to="#" className="navbar-link">
                Token
              </Link>
            </li>
            <li className="navbar-item" onClick={() => setActiveNavbar(false)}>
              <Link to="#" className="navbar-link">
                Pool
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className={`nav-toggle-btn ${activeNavbar && 'active'}`}
          onClick={() => setActiveNavbar(!activeNavbar)}
        >
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
        </button>
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
