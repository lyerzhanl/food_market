import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

function Contacts(props) {
  return (
    <div className="contacts-container">
      <main className="contacts-row">
        <section className="contacts-col left">
          <div className="contactTitle">
            <h2>Get In Touch</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod.
            </p>
          </div>

          <div className="contactInfo">
            <div className="iconGroup">
              <div className="icon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className="contacts-details">
                <span>Phone</span>
                <span>+7777 777 77 77</span>
              </div>
            </div>

            <div className="iconGroup">
              <div className="icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="contacts-details">
                <span>Email</span>
                <span>food_store@message.us</span>
              </div>
            </div>

            <div className="iconGroup">
              <div
                  className="icon">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <div className="contacts-details">
                <span>Location</span>
                <span>AITU, golang classroom</span>
              </div>
            </div>
          </div>

          <div className="socialMedia">
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
        </section>

        <section className="contacts-col right">
          <form className="messageForm">
            <div className="inputGroup halfWidth">
              <input type="text" name="" required="required" />
              <label>Your Name</label>
            </div>

            <div className="inputGroup halfWidth">
              <input type="email" name="" required="required" />
              <label>Email</label>
            </div>

            <div className="inputGroup fullWidth">
              <input type="text" name="" required="required" />
              <label>Subject</label>
            </div>

            <div className="inputGroup fullWidth">
              <textarea required="required"></textarea>
              <label>Say Something</label>
            </div>

            <div className="inputGroup fullWidth">
              <button>Send Message</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Contacts;
