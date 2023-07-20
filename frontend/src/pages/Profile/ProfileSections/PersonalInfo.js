import React, { useEffect, useRef, useState } from 'react';
// import { ImBin } from 'react-icons/im';
import { UseAuthContext } from '../../../hooks/useAuthContext';
import { PostMongo } from '../../../BackOps/PostMongo';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the CSS file for styling

const PersonalInfo = ({ userData }) => {
  const { user } = UseAuthContext();
  const { updateUserData, handleCompress, imageSrc } = PostMongo();

  const inputRef = useRef();
  const compressedImageRef = useRef();

  const [displayPicture, setDisplaypic] = useState();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setMobilenumber] = useState('');
  const [dob, setSelectedDate] = useState('');

  const convertDateFormat = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const dateFormat = (dob) => {
    const [year, month, day] = dob.split('-');
    setSelectedDate(`${day}-${month}-${year}`);
  };

  useEffect(() => {
    if (userData) {
      if (userData.displayPic) {
        setDisplaypic(userData.displayPic);
      }

      if (userData.dob) {
        setSelectedDate(convertDateFormat(userData.dob));
      }

      if (!firstName) {
        setFirstName(userData.firstName);
      }
      if (!lastName) {
        setLastName(userData.lastName);
      }
      if (!phoneNumber) {
        setMobilenumber(userData.phoneNumber);
      }
    }
  }, []);

  const handleUpload = () => {
    handleCompress(inputRef, compressedImageRef);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const _id = user._id;
    updateUserData(_id, firstName, lastName, phoneNumber, dob, imageSrc);
  };

  return (
    <div>
      <div className="information__body">
        <div className="user_image__section align-items-end p-2 gap-4">
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
                  placeholder={userData.firstName}
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
                  placeholder={userData.lastName}
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
            <div className="d-flex position-relative">
              <div className="d-flex flex-column w-50">
                <label htmlFor="DateofBirth" id="dob">
                  Date of birth
                </label>
                {userData.dob && (
                  <input type="text" readOnly defaultValue={dob} />
                )}
                {!userData.dob && (
                  <>
                    <input
                      type="date"
                      onChange={(e) => dateFormat(e.target.value)}
                    />
                    *Once the dob is set, cannot be changed again
                  </>
                )}
              </div>
              <div
                className="save-button d-flex gap-4 position-absolute"
                onClick={handleUpdate}
              >
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
