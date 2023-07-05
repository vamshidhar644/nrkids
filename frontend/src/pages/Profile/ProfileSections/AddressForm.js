import React, { useEffect, useState } from 'react';
import { PostMongo } from '../../../BackOps/PostMongo';

const AddressForm = ({ editData }) => {
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
    }
  }, [editData]);

  const handleAddress = (e) => {
    e.preventDefault();
    updateAddress(
      aId,
      fullname,
      mobile,
      email,
      fullAddress,
      landmark,
      state,
      pincode
    );
  };

  return (
    <div className="d-flex">
      <form action="" className="">
        <h5 className="justify-content-end">Add new address</h5>
        <div className="d-flex gap-2">
          <input
            type="text"
            placeholder="Full name"
            required="required"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile"
            required="required"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="d-flex gap-2">
          <input
            placeholder="Email"
            className="h-2"
            required="required"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Pincode"
            required="required"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
        <div className="d-flex gap-2">
          <textarea
            placeholder="Address"
            className="w-50 h-100"
            required="required"
            value={fullAddress}
            rows="4"
            cols="18"
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          {/* <input
            placeholder="Address"
            className="w-50"
            required="required"
            value={fullAddress}
            onChange={(e) => setAddress(e.target.value)}
          /> */}
          <div className="d-flex flex-column gap-2">
            <input
              type="text"
              placeholder="Landmark"
              required="required"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
            <input
              type="text"
              placeholder="State"
              required="required"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>

        <div className="p-2 d-flex text-nowrap gap-3 align-items-center">
          <button onClick={handleAddress}>Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
