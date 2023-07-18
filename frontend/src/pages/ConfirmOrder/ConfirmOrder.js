import React, { useEffect, useState } from 'react';
import { UseAuthContext } from '../../hooks/useAuthContext';
import { PostMongo } from '../../BackOps/PostMongo';
import './ConfirmOrder.css';

const ConfirmOrder = ({ cartItems, address, totalPrice }) => {
  const { user } = UseAuthContext();
  const { addOrder } = PostMongo();

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
    // setshippingCost(0);
  }, []);

  const currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  const milliseconds = currentDate
    .getMilliseconds()
    .toString()
    .padStart(3, '0');
  const _id = `${hours}${minutes}${seconds}${milliseconds}`;
  const orderedDate = new Date();
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
    console.log(orderedDate);
    await addOrder(userId, orderData);
  };

  return (
    <div>
      <div>
        <table>
          <tr>
            <td>Name</td>
            <td>{orderedName}</td>
          </tr>
          <tr>
            <td>Mobile</td>
            <td>{orderedMobile}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{orderedEmail}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{orderedAddress}</td>
          </tr>
          <tr>
            <td>Landmark</td>
            <td>{orderedLocality}</td>
          </tr>
          <tr>
            <td>State</td>
            <td>{orderedState}</td>
          </tr>
          <tr>
            <td>Pincode</td>
            <td>{orderedPincode}</td>
          </tr>
          <tr>
            <td>Total amount</td>
            <td>{totalAmount}</td>
          </tr>
        </table>
        <div className="d-flex justify-content-center py-2">
          <p className="confirm-order" onClick={ConfirmOrder}>
            Confirm Order
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
