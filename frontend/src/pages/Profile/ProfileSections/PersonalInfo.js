import React, { useState } from 'react';
import { ImBin } from 'react-icons/im';
import { UseAuthContext } from '../../../hooks/useAuthContext';

const PersonalInfo = () => {
  const { user } = UseAuthContext();
  const [selectedDate, setSelectedDate] = useState();
  return (
    <div className="w-100">
      <div className="information-header">
        <h5>Personal Information</h5>
        <hr />
      </div>
      <div className="information-body">
        <div className="user-image-section d-flex align-items-end p-2 gap-4">
          <div className="profile-image-container">
            <img src={``} alt="" className="w-100 h-100 bg-black" />
          </div>
          <div className="d-flex h-100 justify-content-between align-items-center gap-4">
            <div className="profile-image-upload py-1 px-3 file-input w-100 h-100">
              <input
                type="file"
                name="file-input"
                id="file-input"
                className="file-input__input w-100"
              />
              <label className="file-input__label" htmlFor="file-input">
                <span>Upload</span>
              </label>
            </div>
            <button className="profile-image-delete d-flex align-items-center bg-white py-1 px-3 gap-1">
              <ImBin />
              Delete
            </button>
          </div>
        </div>
        <div className="user-inforomation p-2 w-50 mb-4">
          <form action="" className="d-flex flex-column gap-2">
            <div className="d-flex justify-content-between gap-3">
              <div className="d-flex flex-column w-100">
                <label htmlFor="firstName" id="firstName">
                  First Name
                </label>
                <input
                  className="h-100 p-2"
                  type="text"
                  name="firstName"
                  defaultValue={user.firstName}
                ></input>
              </div>
              <div className="d-flex flex-column w-100">
                <label htmlFor="lastName" id="lastName">
                  Last Name
                </label>
                <input
                  className="h-100 p-2"
                  type="text"
                  name="lastName"
                  defaultValue={user.lastName}
                ></input>
              </div>
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="emailAddress" id="emailAddress">
                Email
              </label>
              <input
                className="h-100 p-2"
                type="text"
                name="emailAddress"
                defaultValue={user.email}
              ></input>
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="phoneNumber" id="phoneNumber">
                Mobile Number
              </label>
              <p className="w-50 d-flex align-items-center m-0">
                <span>+91 </span>&nbsp;&nbsp;&nbsp;
                <input
                  className="h-100 p-2 w-100"
                  type="text"
                  name="phoneNumber"
                />
              </p>
            </div>
            <div className="d-flex position-relative">
              <div className="d-flex flex-column w-50">
                <label htmlFor="DateofBirth" id="dob">
                  Date of birth
                </label>
                <input
                  type="date"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  value={selectedDate}
                  className="h-100 p-2"
                />
              </div>
              <div className="save-button d-flex gap-4 position-absolute">
                <p className="profile-image-upload py-1 px-3 m-0">
                  Save Changes
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
