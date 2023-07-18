import React, { useEffect, useState } from 'react';
import { ImWhatsapp } from 'react-icons/im';

const DetailsWithoutData = ({ Product }) => {
  const Productname = Product.title;
  const [message, setMessage] = useState('');
  useEffect(() => {
    const message = encodeURIComponent(
      `Hello,  Nischala!\nI want to know more about *${Productname}*.\nCould you help me with its sizes, prices.`
    );
    setMessage(message);
  });
  const phoneNumber = '8495009009'; // Replace with the phone number you want to send the message to
  const url = `https://wa.me/${phoneNumber}?text=${message}`;

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
        href={url}
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
