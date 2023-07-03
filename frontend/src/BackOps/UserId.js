import { useState } from 'react';

const UserId = () => {
  const [_id, setuserId] = useState(0);
  const generateUserid = () => {
    const currentDate = new Date();
    const date = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const milliseconds = currentDate
      .getMilliseconds()
      .toString()
      .padStart(3, '0');
    setuserId(`NKUID${date}${hours}${minutes}${seconds}${milliseconds}`);
  };
  return { generateUserid, _id };
};

export default UserId;
