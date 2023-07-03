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

  const handleAdd = (e) => {
    e.preventDefault();

    setNewform(!newForm);
    setEditData(null);
  };

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
    <div className="d-flex w-100 justify-content-between align-items-start">
      <div>
        <button onClick={handleAdd}>Add new Address</button>
        <div className="d-flex flex-column mt-3 gap-3">
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
                  <div className=" edit-address w-100 d-flex justify-content-around">
                    <p onClick={() => handleDelete(i)}>Remove</p>
                    <p onClick={() => handleEdit(i)}>Edit</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {newForm ? <AddressForm editData={editData ? editData : ''} /> : null}
    </div>
  );
};

export default MyAddress;
