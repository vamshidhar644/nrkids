import React, { useEffect, useRef, useState } from 'react';
import AddressForm from './AddressForm';
import { FetchMongo } from '../../../helpers/FetchMongo';
import { PostMongo } from '../../../helpers/PostMongo';

const MyAddress = () => {
  const [editData, setEditData] = useState();

  const { fetchAddressData, address } = FetchMongo();
  const { deleteAddress } = PostMongo();

  useEffect(() => {
    fetchAddressData();
  }, []);

  const handleDelete = async (index) => {
    const addressId = address[index]._id;
    deleteAddress(addressId);
    fetchAddressData();
  };

  const addressFormRef = useRef(null);

  const handleEdit = (index) => {
    setEditData(address[index]);
    if (addressFormRef.current) {
      addressFormRef.current.changeTrigger();
    }
  };

  const handleDataChange = () => {
    fetchAddressData();
  };

  const emptyData = () => {
    // Set the addressData to editData when editing an address
    setEditData(null);
  };

  return (
    <div className="address__body d-flex w-100 justify-content-between">
      {address ? (
        <div className="saved__addresses d-flex flex-column gap-3">
          {address.map((address, i) => {
            return (
              <div className="address__card" key={i}>
                <div className="address_card__info">
                  <p>
                    <strong>{address.fullname}</strong>
                  </p>
                  <p className="m-0 small">{address.email}</p>
                  <p className="m-0">{address.fullAddress}</p>
                  <p className="m-0">{address.landmark}</p>
                  <p className="m-0 d-flex gap-2">
                    {address.state}
                    <span>{address.pincode}</span>
                  </p>
                  <p className="m-0 mt-2">Mobile {address.mobile}</p>
                </div>
                <div className=" edit__address d-flex justify-content-around">
                  <p onClick={() => handleDelete(i)}>Remove</p>
                  <p onClick={() => handleEdit(i)}>Edit</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>Loading...</>
      )}
      <AddressForm
        ref={addressFormRef}
        editData={editData && editData}
        emptyData={emptyData}
        onDataChange={handleDataChange}
      />
    </div>
  );
};

export default MyAddress;
