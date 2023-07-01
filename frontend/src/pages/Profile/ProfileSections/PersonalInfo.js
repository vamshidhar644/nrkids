import React, { useEffect, useState } from 'react';
import { ImBin } from 'react-icons/im';
import { FetchMongo } from '../../../BackOps/FetchMongo';
import { UseAuthContext } from '../../../hooks/useAuthContext';
import Dropzone from 'react-dropzone';
import { PostMongo } from '../../../BackOps/PostMongo';

const PersonalInfo = () => {
  const { user } = UseAuthContext();
  const { fetchUserData, userData } = FetchMongo();
  const { updateUserData } = PostMongo();

  const [displayPicture, setDisplaypic] = useState();

  const [file, setFile] = useState(null);

  const [UserfirstName, setFirstName] = useState('');
  const [UserlastName, setLastName] = useState('');
  const [UserphoneNumber, setMobilenumber] = useState('');
  const [Userdob, setSelectedDate] = useState('');

  const handleDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
  };
  const convertDateFormat = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1 to get the correct month number.
    const year = date.getFullYear();

    // Ensure two-digit format for day and month
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  useEffect(() => {
    if (userData) {
      // console.log(userData);
      // setFirstName(userData.firstName);
      // setLastName(userData.lastName);

      if (userData.displayPic) {
        setDisplaypic(userData.displayPic);
      }
      // if (userData.phoneNumber) {
      //   setMobilenumber(userData.phoneNumber);
      // }

      if (userData.dob) {
        setSelectedDate(convertDateFormat(userData.dob));
      }
    }
  });

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // let displayPic;
    // if (!file) {
    //   displayPic = null;
    // } else {
    //   displayPic = file;
    // }

    const _id = user._id;

    updateUserData(_id, UserfirstName, UserlastName, UserphoneNumber, Userdob);
  };

  const handleDeleteImage = () => {
    if (file !== null) {
      setFile(null);
    } else {
      alert("You don't want DP");
    }
  };

  if (!userData) {
    return null;
  }

  return (
    <div className="w-100">
      <div className="information-header">
        <h5>Personal Information</h5>
        <hr />
      </div>
      <div className="information-body">
        <div className="user-image-section d-flex align-items-start p-2 gap-4">
          <div className="profile-image-container">
            <img
              className="w-100 h-100"
              src={file ? URL.createObjectURL(file) : displayPicture}
              alt=""
            />
          </div>
          <div className="d-flex flex-column h-100 justify-content-start align-items-start gap-1">
            <div className="file-input w-100 h-100">
              <input
                type="file"
                name="file-input"
                id="file-input"
                className="file-input__input"
              />
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <input {...getInputProps()} />

                    {file ? (
                      <p className="profile-image-upload py-1 px-3 m-0 small text-nowrap">
                        click again to change
                      </p>
                    ) : (
                      <p className="profile-image-upload py-1 px-3 m-0 small">
                        select image
                      </p>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
            <div
              className="profile-image-delete d-flex align-items-center small bg-white py-1 px-3 gap-1"
              onClick={handleDeleteImage}
            >
              <ImBin />
              Delete
            </div>
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
                    defaultValue={Userdob}
                  />
                )}
                {!userData.dob && (
                  <input
                    type="date"
                    onChange={(e) => setSelectedDate(e.target.value)}
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
