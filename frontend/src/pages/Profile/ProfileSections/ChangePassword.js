import React, { useState } from 'react';
import { PostMongo } from '../../../BackOps/PostMongo';
import { UseAuthContext } from '../../../hooks/useAuthContext';

const ChangePassword = ({ userData }) => {
  const { user } = UseAuthContext();
  const { updatePassword } = PostMongo();

  const [oldpassword, setOldpassword] = useState();
  const [newpassword, setNewpassword] = useState();
  const [re_password, setRepassword] = useState();

  const [error, setError] = useState();

  const handleUpdate = (e) => {
    e.preventDefault();
    // update password logic here...
    if (newpassword !== re_password) {
      setError('Not matched');
    } else {
      updatePassword(user._id, userData.email, oldpassword, newpassword);
      setError('matched');
    }
  };

  return (
    <form className="w-100" action="" onSubmit={handleUpdate}>
      <h5>Change Password</h5>
      <hr />
      <div className="d-flex align-items-end gap-3">
        <div className="change-password d-flex justify-content-between gap-1 flex-column">
          <div className="d-flex flex-column ">
            <label htmlFor="firstName" id="firstName">
              Current Password
            </label>
            <input
              className="h-100 p-2"
              type="password"
              name="oldpassword"
              required
              onChange={(e) => setOldpassword(e.target.value)}
            />
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="lastName" id="newpassword">
              New Password
            </label>
            <input
              className="h-100 p-2"
              type="password"
              name="lastName"
              required
              onChange={(e) => setNewpassword(e.target.value)}
            />
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="lastName" id="lastName">
              Confirm Password
            </label>
            <input
              className="h-100 p-2"
              type="password"
              name="repassword"
              required
              onChange={(e) => setRepassword(e.target.value)}
            />
          </div>
        </div>
        <p className="m-0 pb-2">{error && error}</p>
      </div>
      <div className="save-button w-50 justify-content-center">
        <button className="profile-image-upload bg-white py-1 px-3 w-100">
          Update
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
