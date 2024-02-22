import React from 'react';
import './footer.css';
import { CiFacebook, CiInstagram, CiLinkedin, CiTwitter } from 'react-icons/ci';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer" data-section>
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <Link to="#" className="logo">
              <img
                src="https://codewithsadee.github.io/cryptex/assets/images/logo.svg"
                width="50"
                height="50"
                alt="Crypto logo"
              />
              Crypto
            </Link>

            <h2 className="footer-title">Let's talk!</h2>

            <Link to="#" className="footer-contact-link">
              +12 345 678 9777
            </Link>

            <Link to="#" className="footer-contact-link">
              crypto.crypto@crypto.com
            </Link>

            <address className="footer-contact-link">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </address>
          </div>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Products</p>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Spot
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Inverse Perpetual
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                USDT Perpetual
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Exchange
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Launchpad
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Binance Pay
              </Link>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Services</p>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Buy Crypto
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Markets
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Tranding Fee
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Affiliate Program
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Referral Program
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                API
              </Link>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Support</p>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Bybit Learn
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Help Center
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                User Feedback
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Submit a request
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                API Documentation
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Trading Rules
              </Link>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">About Us</p>
            </li>

            <li>
              <Link to="#" className="footer-link">
                About Bybit
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Authenticity Check
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Careers
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Business Contacts
              </Link>
            </li>

            <li>
              <Link to="#" className="footer-link">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; 2024 Crypto All Rights Reserved by{' '}
            <Link to="#" className="copyright-link">
              Zoubair Hattab
            </Link>
          </p>

          <ul className="social-list">
            <li>
              <Link to="#" className="social-link">
                <CiFacebook name="logo-facebook"></CiFacebook>
              </Link>
            </li>

            <li>
              <Link to="#" className="social-link">
                <CiTwitter name="logo-twitter"></CiTwitter>
              </Link>
            </li>

            <li>
              <Link to="#" className="social-link">
                <CiInstagram name="logo-instagram"></CiInstagram>
              </Link>
            </li>

            <li>
              <Link to="#" className="social-link">
                <CiLinkedin name="logo-linkedin"></CiLinkedin>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
