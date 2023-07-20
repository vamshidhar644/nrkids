import React, { useEffect, useState } from 'react';

import { FetchMongo } from '../../BackOps/FetchMongo';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import AddressForm from '../Profile/ProfileSections/AddressForm';
import ConfirmOrder from '../ConfirmOrder/ConfirmOrder';

const OrderAddress = ({ cartItems, data, totalPrice }) => {
  const { fetchAddressData, address } = FetchMongo();

  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    fetchAddressData();
  }, []);

  const [orderAddress, setAddress] = useState();

  const setIndex = (i) => {
    setOpenConfirm(!openConfirm);
    setAddress(address[i]);
  };

  return (
    <div className="checkout__address">
      <div>
        <h5>Saved Adresses</h5>
        <div className="saved__Address">
          {address &&
            address.map((address, i) => {
              return (
                <div className="address__card p-3 pb-0" key={i}>
                  <h6>{address.fullname}</h6>
                  <p className="m-0">{address.email}</p>
                  <p className="m-0">{address.fullAddress}</p>
                  <p className="m-0">
                    {address.landmark}-<span>{address.pincode}</span>
                  </p>
                  <p className="m-0">{address.state}</p>
                  <h6 className="mt-2">Mobile {address.mobile}</h6>
                  <div className=" deliver__address w-100 d-flex justify-content-end">
                    <p onClick={() => setIndex(i)}>Deliver to this address</p>
                  </div>
                </div>
              );
            })}
          {openConfirm && (
            <div className="popup">
              <div className="popup-content position-relative">
                <p>Are you sure want to confirm order this Address?</p>
                <ConfirmOrder
                  cartItems={cartItems}
                  data={data}
                  address={orderAddress}
                  totalPrice={totalPrice}
                />
                <p
                  className="close__icon m-0"
                  onClick={() => setOpenConfirm(!openConfirm)}
                >
                  <AiOutlineCloseCircle />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="py-3 px-5">
        <AddressForm />
      </div>
    </div>
  );
};

export default OrderAddress;
