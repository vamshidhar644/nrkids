import React, { useEffect, useState } from 'react';
import { PostMongo } from '../../../BackOps/PostMongo';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the CSS file for styling

const AddressForm = ({ editData, onDataChange, triggerFunction }) => {
  const { updateAddress } = PostMongo();

  const [aId, setaddressId] = useState();
  const [fullname, setFullname] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [fullAddress, setAddress] = useState();
  const [landmark, setLandmark] = useState();
  const [state, setState] = useState();
  const [pincode, setPincode] = useState();

  useEffect(() => {
    if (triggerFunction && editData) {
      setaddressId(editData.aId);
      setFullname(editData.fullname);
      setMobile(editData.mobile);
      setEmail(editData.email);
      setAddress(editData.fullAddress);
      setLandmark(editData.landmark);
      setState(editData.state);
      setPincode(editData.pincode);
    }
  }, [editData]);

  const handleAddress = async (e) => {
    e.preventDefault();
    await updateAddress(
      aId,
      fullname,
      mobile,
      email,
      fullAddress,
      landmark,
      state,
      pincode
    );
    onDataChange();
  };

  const handleEmpty = () => {
    setaddressId('');
    setFullname('');
    setMobile('');
    setEmail('');
    setAddress('');
    setLandmark('');
    setState('');
    setPincode('');
  };

  return (
    <form action="" className="new__address d-flex flex-column">
      <p className="add_address__button w-100" onClick={handleEmpty}>
        Add new Address
      </p>
      <input
        type="text"
        placeholder="Full name"
        required="required"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />

      <PhoneInput
        placeholder="Enter phone number"
        className="w-100"
        value={mobile}
        defaultCountry="IN"
        onChange={setMobile}
      />
      <input
        placeholder="Email"
        className="h-2"
        required="required"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <textarea
        placeholder="Address"
        className="w-100"
        required="required"
        value={fullAddress}
        rows="4"
        cols="18"
        onChange={(e) => setAddress(e.target.value)}
      ></textarea>

      <div className="d-flex gap-2">
        <input
          type="text"
          placeholder="Landmark"
          required="required"
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pincode"
          required="required"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
      </div>
      <input
        type="text"
        placeholder="State"
        required="required"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />

      <button className="add_address__button w-100" onClick={handleAddress}>
        {aId ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default AddressForm;
