import { format } from 'date-fns';
import { FetchMongo } from './FetchMongo';

export const PostMongo = () => {
  const { fetchUserData, userData } = FetchMongo();

  const updateUserData = async (
    _id,
    UserfirstName,
    UserlastName,
    UserphoneNumber,
    Userdob
  ) => {
    fetchUserData();

    let firstName = UserfirstName,
      lastName = UserlastName,
      phoneNumber = UserphoneNumber,
      dob = Userdob;

    if (!UserfirstName) {
      firstName = userData.firstName;
    }

    if (!UserlastName) {
      lastName = userData.lastName;
    }

    if (!UserphoneNumber) {
      phoneNumber = userData.phoneNumber;
    }

    if (!dob) {
      const dateObj = new Date(dob);
      dob = format(dateObj, 'dd-MM-yyyy');
    }

    const response = await fetch(`/api/user/${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        dob,
      }),
    });

    if (!response.ok) {
      console.log(firstName, lastName, phoneNumber, dob);
    }
    if (response.ok) {
      alert('updated');
      window.location.reload();
    }
  };

  return { updateUserData };
};
