import React, { forwardRef, useEffect, useState } from 'react';
import { PostMongo } from '../../../helpers/PostMongo';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the CSS file for styling

const AddressForm = forwardRef(({ editData, onDataChange }, ref) => {
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
    if (editData) {
      setaddressId(editData.aId);
      setFullname(editData.fullname);
      setMobile(editData.mobile);
      setEmail(editData.email);
      setAddress(editData.fullAddress);
      setLandmark(editData.landmark);
      setState(editData.state);
      setPincode(editData.pincode);
    } else {
      setaddressId('');
      setFullname('');
      setMobile('');
      setEmail('');
      setAddress('');
      setLandmark('');
      setState('');
      setPincode('');
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

  return (
    <form
      action=""
      className="new__address d-flex flex-column gap-3 w-100"
      onSubmit={handleAddress}
    >
      <input
        type="text"
        placeholder="Full name"
        required
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />

      <PhoneInput
        placeholder="Enter phone number"
        className="w-100"
        value={mobile}
        defaultCountry="IN"
        required={true}
        onChange={setMobile}
      />
      <input
        placeholder="Email"
        className="h-2"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <textarea
        placeholder="Address"
        className="w-100 m-0"
        required
        value={fullAddress}
        rows="4"
        cols="18"
        onChange={(e) => setAddress(e.target.value)}
      ></textarea>

      <div className="d-flex gap-2">
        <input
          type="text"
          placeholder="Landmark"
          required
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
        />
        <input
          type="number"
          placeholder="Pincode"
          required
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
      </div>
      <input
        type="text"
        placeholder="State"
        required
        value={state}
        onChange={(e) => setState(e.target.value)}
      />

      <button className="add_address__button w-100">
        {aId ? 'Update' : 'Add'}
      </button>
    </form>
  );
});

export default AddressForm;
