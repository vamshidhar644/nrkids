import React, { useEffect, useRef, useState } from 'react';
// import { ImBin } from 'react-icons/im';
import { PostMongo } from '../../../helpers/PostMongo';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PersonalInfo = ({ userData }) => {
  const { updateUserData, handleCompress, imageSrc } = PostMongo();

  const inputRef = useRef();
  const compressedImageRef = useRef();

  const [displayPicture, setDisplaypic] = useState();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setMobilenumber] = useState('');
  const [dob, setSelectedDate] = useState('');

  useEffect(() => {
    if (userData) {
      setDisplaypic(userData.displayPic || null);
      setSelectedDate(userData.dob.split('T')[0] || null);
      setFirstName(userData.firstName || firstName);
      setLastName(userData.lastName || lastName);
      setMobilenumber(userData.phoneNumber || phoneNumber);
    }
  }, []);

  const handleUpload = () => {
    handleCompress(inputRef, compressedImageRef);
  };

  const handleUpdate = async (e) => {
    updateUserData(firstName, lastName, phoneNumber, dob, imageSrc);
  };

  return (
    <div>
      <div className="information__body">
        <div className="user_image__section p-2 gap-4">
          <div className="profile-image-container">
            <img
              className="w-100 h-100"
              src={imageSrc ? imageSrc : displayPicture}
              alt=""
            />
          </div>
          <div className="profile_image d-flex align-items-center bg-white py-1 px-3 gap-1">
            <input
              type="file"
              id="file-input"
              className="hidden-input"
              onChange={handleUpload}
              ref={inputRef}
            />
            {!imageSrc ? (
              <label htmlFor="file-input" className="custom-label">
                upload image
              </label>
            ) : (
              <label htmlFor="file-input" className="custom-label">
                change
              </label>
            )}
          </div>
        </div>
        <div className="user__inforomation p-2 mb-4">
          <form action="" className="d-flex flex-column gap-2">
            <div className="d-flex justify-content-between gap-3">
              <div className="d-flex flex-column w-100">
                <label htmlFor="firstName" id="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={userData.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              <div className="d-flex flex-column w-100">
                <label htmlFor="lastName" id="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={userData.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="emailAddress" id="emailAddress">
                Email
              </label>
              <input
                type="text"
                name="emailAddress"
                defaultValue={userData.email}
                readOnly
              />
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="phoneNumber" id="phoneNumber">
                Mobile Number
              </label>
              <PhoneInput
                placeholder="Enter phone number"
                className="d-flex align-items-center m-0"
                value={phoneNumber}
                defaultCountry="IN"
                onChange={setMobilenumber}
              />
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="DateofBirth" id="dob">
                Date of birth
              </label>
              <input
                type="date"
                defaultValue={dob}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="save__button d-flex" onClick={handleUpdate}>
              <p className="profile-image-upload py-1 px-3 m-0">Save Changes</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
