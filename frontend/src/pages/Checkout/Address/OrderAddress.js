import React, { useEffect } from 'react';
import { FetchMongo } from '../../../BackOps/FetchMongo';
import { UseAuthContext } from '../../../hooks/useAuthContext';
import './OrderAddress.css';
import AddressForm from '../../Profile/ProfileSections/AddressForm';

const OrderAddress = () => {
  const { user } = UseAuthContext();
  const { fetchAddressData, address } = FetchMongo();
  useEffect(() => {
    fetchAddressData();
  }, [user]);

  const handleEdit = () => {};
  return (
    <div className="checkout-address">
      <div>
        <h5>Saved Adresses</h5>
        <div className="saved-Address">
          {address &&
            address.map((address, i) => {
              return (
                <div className="address-card p-3 pb-0" key={i}>
                  <h5>{address.fullname}</h5>
                  <p className="m-0 small">{address.email}</p>
                  <p className="m-0">
                    {address.fullAddress}-<span>{address.pincode}</span>
                  </p>
                  <p className="m-0">{address.state}</p>
                  <h6 className="mt-2">Mobile {address.mobile}</h6>
                  <div className=" deliver-address w-100 d-flex justify-content-end">
                    <p onClick={() => handleEdit(i)}>Deliver to this address</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className='py-3'>
        <AddressForm />
      </div>
    </div>
  );
};

export default OrderAddress;
