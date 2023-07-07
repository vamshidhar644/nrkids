import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const MobileVerify = () => {
  const [number, setNumber] = useState();
  return (
    <div className="w-100 p-4">
      <div className="d-flex flex-column w-50">
        <label htmlFor="phoneNumber" id="phoneNumber">
          Mobile Number
        </label>
        <div className="w-50 d-flex align-items-center m-0">
          <PhoneInput
            defaultCountry="IN"
            value={number}
            onChange={setNumber}
            placeholder="Phone Number"
          ></PhoneInput>
        </div>
      </div>
    </div>
  );
};

export default MobileVerify;
