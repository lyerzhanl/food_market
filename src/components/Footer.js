import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <Link to="">about us</Link>
              </li>
              <li>
                <Link to="">our services</Link>
              </li>
              <li>
                <Link to="">privacy policy</Link>
              </li>
              <li>
                <Link to="">affiliate program</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>get help</h4>
            <ul>
              <li>
                <Link to="">FAQ</Link>
              </li>
              <li>
                <Link to="">Delivery</Link>
              </li>
              <li>
                <Link to="">payment options</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>online shop</h4>
            <ul>
              <li>
                <Link to="">Products</Link>
              </li>
              <li>
                <Link to="">Categories</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <Link to="">
                <FontAwesomeIcon icon={faFacebookF} />
              </Link>
              <Link to="">
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
              <Link to="">
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
              <Link to="">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
