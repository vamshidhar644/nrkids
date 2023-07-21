import React, { useEffect, useState } from 'react';
import AddressForm from './AddressForm';
import { FetchMongo } from '../../../BackOps/FetchMongo';
import { UseAuthContext } from '../../../hooks/useAuthContext';
import { PostMongo } from '../../../BackOps/PostMongo';

const MyAddress = () => {
  const { user } = UseAuthContext();

  const [editData, setEditData] = useState();

  const { fetchAddressData, address } = FetchMongo();
  const { deleteAddress } = PostMongo();
  useEffect(() => {
    fetchAddressData();
  }, [user]);

  const handleDelete = async (index) => {
    const addressId = address[index]._id;
    const userId = user._id;

    deleteAddress(userId, addressId);
  };

  const handleEdit = (index) => {
    setEditData(address[index]);
    setNewform(!newForm);
  };

  const [newForm, setNewform] = useState(false);

  const handleAdd = (e) => {
    setNewform(!newForm);
  };

  return (
    <div className="address__body d-flex w-100 justify-content-between align-items-start gap-3">
      <div className="address d-flex w-100 gap-3">
        <div className="saved__addresses w-100 d-flex flex-column gap-3">
          {address &&
            address.map((address, i) => {
              return (
                <div className="address__card w-100" key={i}>
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
        <div className="w-100">
          <p onClick={handleAdd} className="add_address__button">
            Add new Address
          </p>
          {newForm ? <AddressForm editData={editData ? editData : ''} /> : null}
        </div>
      </div>
    </div>
  );
};

export default MyAddress;
