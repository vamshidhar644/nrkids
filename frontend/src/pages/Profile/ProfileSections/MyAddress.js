import React, { useEffect, useState } from 'react';
import AddressForm from './AddressForm';
import { FetchMongo } from '../../../BackOps/FetchMongo';
import { UseAuthContext } from '../../../hooks/useAuthContext';
import { PostMongo } from '../../../BackOps/PostMongo';

const MyAddress = () => {
  const { user } = UseAuthContext();
  const [newForm, setNewform] = useState(false);

  const [editData, setEditData] = useState();

  const { fetchAddressData, address } = FetchMongo();
  const { deleteAddress } = PostMongo();
  useEffect(() => {
    fetchAddressData();
  }, [user]);

  const handleEdit = (index) => {
    setNewform(!newForm);
    setEditData(address[index]);
  };

  const handleDelete = async (index) => {
    const addressId = address[index]._id;
    const userId = user._id;

    deleteAddress(userId, addressId);
  };

  return (
    <div className="address__body d-flex w-100 justify-content-between align-items-start gap-3">
      <div className="address d-flex w-100 gap-3">
        <div className="saved__addresses d-flex flex-column gap-3">
          {address &&
            address.map((address, i) => {
              return (
                <div className="address-card w-100 p-3 pb-0" key={i}>
                  <p>{address.fullname}</p>
                  <p className="m-0 small">{address.email}</p>
                  <p className="m-0">{address.fullAddress}</p>
                  <p className="m-0">{address.landmark}</p>
                  <p className="m-0 d-flex gap-2">
                    {address.state}
                    <span>{address.pincode}</span>
                  </p>
                  <p className="mt-2">Mobile {address.mobile}</p>
                  <div className=" edit-address w-100 d-flex justify-content-around">
                    <p onClick={() => handleDelete(i)}>Remove</p>
                    <p onClick={() => handleEdit(i)}>Edit</p>
                  </div>
                </div>
              );
            })}
        </div>
        <AddressForm editData={editData ? editData : ''} />
      </div>
    </div>
  );
};

export default MyAddress;
