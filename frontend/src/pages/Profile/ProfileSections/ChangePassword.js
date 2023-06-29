import React from 'react';

const ChangePassword = () => {
  return (
    <div className="w-100">
      <h5>Change Password</h5>
      <hr />
      <div className="change-password d-flex justify-content-between gap-3 flex-column w-50">
        <div className="d-flex flex-column w-50">
          <label htmlFor="firstName" id="firstName">
            Current Password
          </label>
          <input className="h-100 p-2" type="password" name="firstName"></input>
        </div>
        <div className="d-flex flex-column w-50">
          <label htmlFor="lastName" id="lastName">
            New Password
          </label>
          <input className="h-100 p-2" type="password" name="lastName"></input>
        </div>
        <div className="d-flex flex-column w-50">
          <label htmlFor="lastName" id="lastName">
            Confirm Password
          </label>
          <input className="h-100 p-2" type="password" name="lastName"></input>
        </div>
        <div className="save-button w-50">
          <button className="profile-image-upload bg-white py-1 px-3">
            Update password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
