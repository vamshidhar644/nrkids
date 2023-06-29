import React from 'react';
import './Contact.css';
import { ImWhatsapp } from 'react-icons/im';

const Contact = () => {
  const phoneNumber = '8495009009'; // Replace with the recipient's phone number

  const message = encodeURIComponent('Hello, Nischala!');
  return (
    <div>
      <div className="Chat-Container">
        <h1>Chat with our experts</h1>
        <p>Confused for fitting or other questions??</p>
        <div className="contact-button">
          <a
            href={`https://wa.me/${phoneNumber}?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="d-flex justify-content-center align-items-center"
          >
            click to chat on &nbsp;
            <span>
              <ImWhatsapp className="chat-icon" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
