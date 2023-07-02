import React, { useEffect, useRef, useState } from 'react';
// import { ImBin } from 'react-icons/im';
import { UseAuthContext } from '../../../hooks/useAuthContext';
import { PostMongo } from '../../../BackOps/PostMongo';

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

  // const handleDeleteImage = () => {
  //   if (imageSrc) {
  //     setDisplaypic(null);
  //     const _id = user._id;
  //     const imageSrc = '';
  //     // updateUserData(_id, firstName, lastName, phoneNumber, dob, imageSrc);
  //   }
  // };

  return (
    <div className="w-100">
      <div className="information-header">
        <h5>Personal Information</h5>
        <hr />
      </div>
      <div className="information-body">
        <div className="user-image-section d-flex align-items-end p-2 gap-4">
          <div className="profile-image-container">
            <img
              className="w-100 h-100"
              src={imageSrc ? imageSrc : displayPicture}
              alt=""
            />
          </div>
          <div className="d-flex flex-column justify-content-start align-items-start gap-1">
            <div className=" d-flex align-items-center small bg-white py-1 px-3 gap-1">
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
            {/* <div
              className="profile-image-delete d-flex align-items-center small bg-white py-1 px-3 gap-1"
              onClick={handleDeleteImage}
            >
              <ImBin />
              Delete
            </div> */}
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
                  placeholder={userData.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                className="h-100 p-2"
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
              <p className="w-50 d-flex align-items-center m-0">
                <span>+91 </span>&nbsp;&nbsp;&nbsp;
                <input
                  className="h-100 p-2 w-100"
                  type="text"
                  name="phoneNumber"
                  placeholder={userData.phoneNumber}
                  onChange={(e) => setMobilenumber(e.target.value)}
                />
              </p>
            </div>
            <div className="d-flex position-relative">
              <div className="d-flex flex-column w-50">
                <label htmlFor="DateofBirth" id="dob">
                  Date of birth
                </label>
                {userData.dob && (
                  <input
                    type="text"
                    className="m-0"
                    readOnly
                    defaultValue={dob}
                  />
                )}
                {!userData.dob && (
                  <input
                    type="date"
                    onChange={(e) => dateFormat(e.target.value)}
                    className="h-100 p-2"
                  />
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
