import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';
import './ProfileBody.css';

import PersonalInfo from './ProfileSections/PersonalInfo';
import MyOrders from './ProfileSections/MyOrders';
import MyAddress from './ProfileSections/MyAddress';

import ChangePassword from './ProfileSections/ChangePassword';
import Logout from '../Components/Logout/Logout';

import { FaInfo, FaKey } from 'react-icons/fa';
import { GiLargeDress } from 'react-icons/gi';
import { GoLocation } from 'react-icons/go';
import { FetchMongo } from '../../BackOps/FetchMongo';
import { UseAuthContext } from '../../hooks/useAuthContext';

const ProfileBody = () => {
  const { user } = UseAuthContext();
  const { userData, fetchUserData } = FetchMongo();

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const profileList = [
    { title: 'Personal Information', icon: <FaInfo className="list__icon" /> },
    { title: 'My Orders', icon: <GiLargeDress className="list__icon" /> },
    { title: 'My Addresses', icon: <GoLocation className="list__icon" /> },
    { title: 'Change Password', icon: <FaKey className="list__icon" /> },
  ];

  const [section, setSection] = useState(profileList[0].title);

  const changeSection = (item) => {
    setSection(item);
  };

  const location = useLocation();
  // const { id } = useParams();

  useEffect(() => {
    // Get the value of the 'value' query parameter from the location search
    const searchParams = new URLSearchParams(location.search);
    const valueFromOrders = searchParams.get('value');

    if (valueFromOrders === 'my-orders') {
      setSection(profileList[1].title);
    }
  }, [location.search]);

  return userData ? (
    <div className="profile-main-container">
      <div className="p-4">
        <div>
          <div className="user__path d-flex justify-content-start align-items-center gap-2">
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
        <div className="profile__body d-flex gap-4">
          <div className="profile_section__list">
            <ul className="list-unstyled d-flex gap-2 justify-content-between">
              {profileList.map((item, i) => {
                return (
                  <li
                    key={i}
                    className={`profile__sections py-4 d-flex ${
                      section === profileList[i].title ? 'active-section' : ''
                    }`}
                    onClick={() => changeSection(item.title)}
                  >
                    {item.icon}
                    <p className="list_item_para m-0 mx-2 ">{item.title}</p>
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
            <PersonalInfo userData={userData ? userData : null} />
          ) : null}
          {section === profileList[1].title ? <MyOrders /> : null}
          {section === profileList[2].title ? <MyAddress /> : null}
          {section === profileList[3].title ? (
            <ChangePassword userData={userData ? userData : null} />
          ) : null}
        </div>
      </div>
    </div>
  ) : (
    <>Loading...</>
  );
};

export default ProfileBody;
