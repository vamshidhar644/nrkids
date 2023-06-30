import React, { useEffect, useState } from 'react';
import { FetchSanity } from '../../BackOps/FetchSanity';

const OfferSection = () => {
  const { fetchOfferLine, offerLine } = FetchSanity();

  const [closeOffer, setCloseOffer] = useState(false);

  useEffect(() => {
    fetchOfferLine();
  }, []);

  return (
    <div>
      {!closeOffer && (
        <div className="offer-section d-flex align-items-center">
          {offerLine && (
            <div className="marquee-container w-100">
              <div className="marquee-content m-0 p-0 justify-content-around">
                <div className="marquee-item">{offerLine[0].offer}</div>
                <div className="marquee-item">{offerLine[0].offer}</div>
                <div className="marquee-item">{offerLine[0].offer}</div>
                <div className="marquee-item">{offerLine[0].offer}</div>
              </div>
            </div>
          )}
          <p className="Close m-0 p-0 px-2" onClick={() => setCloseOffer(true)}>
            X
          </p>
        </div>
      )}
    </div>
  );
};

export default OfferSection;
