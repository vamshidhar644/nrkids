import React from 'react';
import { ImWhatsapp } from 'react-icons/im';

const DetailsWithoutData = ({ Product }) => {
  return (
    <div className="product-description">
      <p>
        For help with sizes, delivery times or anything else, reach us at
        &nbsp;&nbsp;
        <span>
          <ImWhatsapp className="chat-icon" />
        </span>
      </p>
      <a href="" target="_blank">
        Enquire now
      </a>
    </div>
  );
};

export default DetailsWithoutData;
