import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';
import './ProfileBody.css';

import PersonalInfo from './ProfileSections/PersonalInfo';
import MyOrders from './ProfileSections/MyOrders';
import MyAddress from './ProfileSections/MyAddress';

import ChangePassword from './ProfileSections/ChangePassword';
import Logout from '../Components/Logout/Logout';

const ProfileBody = ({ userData }) => {
  const profileList = [
    { title: 'Personal Information' },
    { title: 'My Orders' },
    { title: 'My Addresses' },
    { title: 'Change Password' },
  ];

  const [section, setSection] = useState(profileList[0].title);

  const changeSection = (item) => {
    setSection(item);
  };

  return (
    <div className="profile-main-container">
      {userData ? (
        <div className="p-4">
          <div>
            <div className="small d-flex justify-content-start align-items-center gap-2">
              <Link to="/">Home </Link>
              <BiChevronRight />
              <p
                className={`m-0 ${
                  section !== profileList[0].title ? 'go-to-user' : ''
                }`}
                onClick={() => setSection(profileList[0].title)}
              >
                User Profile
              </p>
              {section === profileList[0].title ? null : (
                <>
                  <BiChevronRight />
                  {section}
                </>
              )}
            </div>
            <div className="profile-header py-4 d-flex justify-content-between align-items-center">
              <h1>{section}</h1>
              <Logout />
            </div>
          </div>
          <div className="profile-body d-flex gap-4">
            <div className="profile-section-list">
              <ul className="list-unstyled d-flex flex-column gap-2">
                {profileList.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className={`p-3 pl-0 d-flex justify-content-between ${
                        section === profileList[i].title ? 'active-section' : ''
                      }`}
                      onClick={() => changeSection(item.title)}
                    >
                      <p className="m-0 mx-2 ">{item.title}</p>
                      <BiChevronRight
                        className={
                          section === profileList[i].title
                            ? 'active-section-arrow'
                            : ''
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            {section === profileList[0].title ? (
              <PersonalInfo userData={userData} />
            ) : null}
            {section === profileList[1].title ? <MyOrders /> : null}
            {section === profileList[2].title ? <MyAddress /> : null}
            {section === profileList[3].title ? (
              <ChangePassword userData={userData} />
            ) : null}
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default ProfileBody;
