import React, { useEffect, useRef, useState } from 'react';
import AddressForm from './AddressForm';
import { FetchMongo } from '../../../helpers/FetchMongo';
import { PostMongo } from '../../../helpers/PostMongo';

const MyAddress = () => {
  const [editData, setEditData] = useState();
  const [showForm, setShowform] = useState(false);

  const { fetchAddressData, address } = FetchMongo();
  const { deleteAddress } = PostMongo();

  const [renderCount, setCount] = useState(0);

  useEffect(() => {
    if (renderCount === 2) {
      fetchAddressData();
    } else {
      setCount(2);
    }
  }, [renderCount]);

  const handleDelete = async (index) => {
    const addressId = address[index]._id;
    deleteAddress(addressId);
    fetchAddressData();
  };

  const addressFormRef = useRef(null);

  const handleEdit = (index) => {
    setEditData(address[index]);
    setShowform(true);
    if (addressFormRef.current) {
      addressFormRef.current.changeTrigger();
    }
  };

  const handleDataChange = () => {
    fetchAddressData();
    setShowform(false);
  };

  const emptyData = () => {
    setEditData(null);
    setShowform(true);
  };

  const closePopup = () => {
    setShowform(false);
  };

  return (
    <div className="address__body d-flex justify-content-between gap-4 w-100">
      {address ? (
        <div className="saved__addresses d-flex flex-column gap-3">
          <p className="add_address__button w-100" onClick={emptyData}>
            Add new Address
          </p>
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
      {showForm ? (
        <div className="popup">
          <div className="popup-content address__form position-relative">
            <AddressForm
              ref={addressFormRef}
              editData={editData && editData}
              onDataChange={handleDataChange}
            />
            <p className="add_address__button m-0 mt-3" onClick={closePopup}>
              close
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MyAddress;
