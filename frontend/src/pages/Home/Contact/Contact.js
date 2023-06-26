import React from 'react';
import './Contact.css';
import { ImWhatsapp } from 'react-icons/im';

const Contact = () => {
  return (
    <div>
      <div className="Chat-Container">
        <h1>Chat with our experts</h1>
        <p>Confused for fitting or other questions??</p>
        <div className="contact-button">
          <p>
            click to chat on &nbsp;
            <span>
              <ImWhatsapp className="chat-icon" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
