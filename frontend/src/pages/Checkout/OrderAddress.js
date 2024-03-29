import React, { useEffect, useState } from 'react';

import { FetchMongo } from '../../helpers/FetchMongo';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import AddressForm from '../Profile/ProfileSections/AddressForm';
import ConfirmOrder from '../ConfirmOrder/ConfirmOrder';
import Loader from '../../Components/Loader/Loader';

const OrderAddress = ({ cartItems, data, totalPrice }) => {
  const { fetchAddressData, address } = FetchMongo();

  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    fetchAddressData();
  }, [address]);

  const [orderAddress, setAddress] = useState();

  const setIndex = (i) => {
    setOpenConfirm(!openConfirm);
    setAddress(address[i]);
    document.body.style.overflow = 'hidden';
  };
  const closePopup = () => {
    setOpenConfirm(!openConfirm);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="checkout__address">
      <div>
        <div className="saved__Address">
          {address ? (
            address.map((address, i) => {
              return (
                <div className="address__card" key={i}>
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
            })
          ) : (
            <Loader />
          )}
          {openConfirm && (
            <div className="popup">
              <div className="popup-content confirm__order position-relative">
                <p className="m-0">
                  Are you sure want to confirm order to this Address?
                </p>
                <hr />
                <ConfirmOrder
                  cartItems={cartItems}
                  data={data}
                  address={orderAddress}
                  totalPrice={totalPrice}
                />
                <p className="close__icon m-0" onClick={closePopup}>
                  <AiOutlineCloseCircle />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="checkout__new_address">
        <AddressForm />
      </div>
    </div>
  );
};

export default OrderAddress;
