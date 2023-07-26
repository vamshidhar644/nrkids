import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import firebase from 'firebase/compat/app';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MobileVerify = ({ number, ConfirmOrder }) => {
  const [otp, setOtp] = useState();

  const [openOTP, setOpen] = useState(false);

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log('ReCaptcha Cerified');
        },
      }
    );
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();

    const phoneNumber = number;

    const appVerifier = window.recaptchaVerifier;

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setOpen(true);
        window.confirmationResult = confirmationResult;
        toast.success(`OTP sent to ${phoneNumber}`, {
          position: 'bottom-center',
          autoClose: 2000, // 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        setOpen(false);
        toast.error('Please refresh and try!', {
          position: 'bottom-center',
          autoClose: 2000, // 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = otp;
    // console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        ConfirmOrder();
      })
      .catch((error) => {
        setOpen(false);
        console.log(error);
        toast.error('OTP is not correct', {
          position: 'bottom-center',
          autoClose: 2000, // 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  return (
    <form className="d-flex flex-column">
      <div id="sign-in-button" />
      <div className="d-flex align-items-start justify-content-between m-0 gap-2">
        {openOTP ? (
          <div className="verify__otp">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
            />
            <div className="confirm_order__button" onClick={onSubmitOTP}>
              Confirm Order
            </div>
          </div>
        ) : (
          <div className="confirm_order__button" onClick={onSignInSubmit}>
            Generate OTP
          </div>
        )}
      </div>
    </form>
  );
};

export default MobileVerify;
