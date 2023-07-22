import { useState } from 'react';
import { UseAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

export const PostMongo = () => {
  const { user } = UseAuthContext();
  const [imageSrc, setImage] = useState();
  const navigate = useNavigate();

  //  I M A G E  C O M P R E S S . . . . .
  const handleCompress = (inputRef, compressedImageRef) => {
    const inputImage = inputRef.current;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = URL.createObjectURL(inputImage.files[0]);

    image.onload = () => {
      const maxWidth = 200; // You can adjust this to the desired width
      const maxHeight = 200; // You can adjust this to the desired height

      let newWidth = image.width;
      let newHeight = image.height;

      if (image.width > maxWidth) {
        newWidth = maxWidth;
        newHeight = (image.height * maxWidth) / image.width;
      }

      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = (image.width * maxHeight) / image.height;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(image, 0, 0, newWidth, newHeight);

      const compressedImageBase64 = canvas.toDataURL('image/jpeg', 0.5); // Set the quality (0.0 - 1.0)
      setImage(compressedImageBase64);
    };
  };

  //  U S E R D A T A . . . . . . .
  const updateUserData = async (
    _id,
    firstName,
    lastName,
    phoneNumber,
    dob,
    displayPic
  ) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/${_id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          dob,
          displayPic,
        }),
      }
    );

    if (!response.ok) {
    }
    if (response.ok) {
      alert('updated');
    }
  };

  // P A S S W O R D S . . . . . . .
  const updatePassword = async (_id, email, oldpassword, newpassword) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/${_id}/change-password`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          oldpassword,
          newpassword,
        }),
      }
    );

    if (!response.ok) {
      // console.log('Something went wrong');
    }
    if (response.ok) {
      alert('updated');
      window.location.reload();
    }
  };

  const updatecart = async (productId, itemsData) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/cart/${productId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemsData }),
      }
    );
    // const json = await response.json();

    if (!response.ok) {
      console.log('something wrong');
    }
    if (response.ok) {
      navigate('/your-bag');
    }
  };

  // D E L E T E  C A R T  I T E M
  const deleteCartItem = async (productId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/${user._id}/cart/${productId}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }
    );
    // const json = await response.json();

    if (!response.ok) {
      console.log('something wrong');
    }
    if (response.ok) {
    }
  };

  //  A D D R E S S . . . . . . .
  const updateAddress = async (
    addId,
    fullname,
    mobile,
    email,
    fullAddress,
    landmark,
    state,
    pincode
  ) => {
    let aId;
    if (addId) {
      aId = addId;
    } else {
      const currentDate = new Date();
      const date = currentDate.getDate().toString().padStart(2, '0');
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const seconds = currentDate.getSeconds().toString().padStart(2, '0');
      const milliseconds = currentDate
        .getMilliseconds()
        .toString()
        .padStart(3, '0');
      aId = `NKADDUID${date}${hours}${minutes}${seconds}${milliseconds}`;
    }
    const userId = user._id;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/address/${aId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          fullname,
          mobile,
          email,
          fullAddress,
          landmark,
          state,
          pincode,
        }),
      }
    );
    if (!response.ok) {
      console.log('Something went wrong');
    }
    if (response.ok) {
      alert('updated');
      window.location.reload();
    }
  };

  const deleteAddress = async (userId, addressId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}/address/${addressId}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      console.log('Something went Wrong');
    }
    if (response.ok) {
      alert('Deleted');
      window.location.reload();
    }
  };

  // W I S H L I S T . . . . . . .
  const updateWishlist = async (productId) => {
    const userId = user._id;

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/wishlist/add`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          productId,
        }),
      }
    );

    if (!response.ok) {
      console.log('Something went wrong');
    }
    if (response.ok) {
      window.location.reload();
      // console.log('Updated');
    }
  };

  const deleteWishlist = async (productId) => {
    const userId = user._id;

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}/wishlist/${productId}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      console.log('Something went wrong');
    }
    if (response.ok) {
      // console.log('deleted');

      window.location.reload();
    }
  };

  const addOrder = async (userId, orderData) => {
    // console.log(userId, orderData);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/order/${userId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderData }),
      }
    );
    // const json = await response.json();

    if (!response.ok) {
      console.log('something wrong');
    }
    if (response.ok) {
      // save the user to local storage
      // navigate('/your-bag');
      // console.log('Success');
    }
  };

  return {
    updateUserData,
    handleCompress,
    imageSrc,
    updatecart,
    updatePassword,
    deleteCartItem,
    updateAddress,
    deleteAddress,
    updateWishlist,
    deleteWishlist,
    addOrder,
  };
};
