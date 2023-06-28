import React from 'react';
import { ImWhatsapp } from 'react-icons/im';

const DetailsWithoutData = () => {
  const phoneNumber = '8495009009'; // Replace with the recipient's phone number

  const message = encodeURIComponent('Hello, Nischala!');

  return (
    <div className="product-description">
      <p>
        For help with sizes, delivery times or anything else, reach us at
        &nbsp;&nbsp;
        <span>
          <ImWhatsapp className="chat-icon" />
        </span>
      </p>
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noreferrer"
        className="d-flex justify-content-center align-items-center"
      >
        Enquire now
      </a>
    </div>
  );
};

export default DetailsWithoutData;
