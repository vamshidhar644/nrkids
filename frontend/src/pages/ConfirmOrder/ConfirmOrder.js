import React, { useEffect, useState } from 'react';
import { UseAuthContext } from '../../hooks/useAuthContext';
import { PostMongo } from '../../helpers/PostMongo';
import './ConfirmOrder.css';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import MobileVerify from './MobileVerify';

const ConfirmOrder = ({ cartItems, address, totalPrice }) => {
  const { user } = UseAuthContext();
  const { addOrder } = PostMongo();
  const navigate = useNavigate();

  const [userId, setUserId] = useState();
  const [orderedName, setorderedName] = useState();
  const [orderedMobile, setorderedMobile] = useState();
  const [orderedEmail, setorderedEmail] = useState();
  const [orderedAddress, setorderedAddress] = useState();
  const [orderedLocality, setorderedLocality] = useState();
  const [orderedState, setorderedState] = useState();
  const [orderedPincode, setorderedPincode] = useState();
  const [items, setItems] = useState([]);
  const [totalAmount, settotalAmount] = useState();
  const [shippingCost, setshippingCost] = useState(0);

  useEffect(() => {
    setUserId(user._id);
    setorderedName(address.fullname);
    setorderedMobile(address.mobile);
    setorderedEmail(address.email);
    setorderedAddress(address.fullAddress);
    setorderedLocality(address.landmark);
    setorderedState(address.state);
    setorderedPincode(address.pincode);
    setItems(cartItems);
    settotalAmount(totalPrice);
    setshippingCost(0);
  }, []);

  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear() % 100;
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  const _id = `${date}${month}${year}${hours}${minutes}${seconds}`;

  const orderedDate = currentDate;
  const status = 'Yet to confirm';
  const orderData = {
    _id,
    userId,
    orderedName,
    orderedMobile,
    orderedEmail,
    orderedAddress,
    orderedLocality,
    orderedState,
    orderedPincode,
    items,
    totalAmount,
    orderedDate,
    shippingCost,
    status,
  };

  const ConfirmOrder = async () => {
    // alert('Is in construction');
    await addOrder(userId, orderData);

    document.body.style.overflow = 'auto';
    navigate(`/my-profile/${user._id}?value=my-orders`);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="confirm__card">
      <div>
        <p className="m-0">
          <strong>{orderedName}</strong>
        </p>
        <p className="m-0">{address.email}</p>
        <p className="m-0">{address.fullAddress}</p>
        <p className="m-0">
          {address.landmark}-<span>{address.pincode}</span>
        </p>
        <p className="m-0">{address.state}</p>
        <p className="mt-2">Mobile {address.mobile}</p>
      </div>
      <p>
        <AiOutlineInfoCircle /> Once you place the order the payment will be
        done after seller confirmed. You can check the status in{' '}
        <b>My Orders</b>.
      </p>
      <MobileVerify number={address.mobile} ConfirmOrder={ConfirmOrder} />
    </div>
  );
};

export default ConfirmOrder;
