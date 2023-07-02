import { useState } from 'react';

export const PostMongo = () => {
  const [imageSrc, setImage] = useState();

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
      // compressedImageRef.current.value = compressedImageBase64;

      // console.log(compressedImageBase64);
    };
  };

  const updateUserData = async (
    _id,
    firstName,
    lastName,
    phoneNumber,
    dob,
    displayPic
  ) => {
    console.log(_id, firstName, lastName, phoneNumber, dob, displayPic);

    const response = await fetch(`/api/user/${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        dob,
        displayPic,
      }),
    });

    if (!response.ok) {
      console.log(_id, firstName, lastName, phoneNumber, dob, displayPic);
    }
    if (response.ok) {
      alert('updated');
      window.location.reload();
    }
  };

  const updatePassword = async (_id, email, oldpassword, newpassword) => {
    console.log(email, oldpassword, newpassword);

    const response = await fetch(`/api/user/${_id}/change-password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        oldpassword,
        newpassword,
      }),
    });

    if (!response.ok) {
      console.log(email, oldpassword, newpassword);
    }
    if (response.ok) {
      console.log(response);
      alert('updated');
      window.location.reload();
    }
  };

  return { updateUserData, handleCompress, imageSrc, updatePassword };
};
