import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PayButton = ({ orderdata }) => {
  const [showItem, setShowitem] = useState(false);
  const handlePayment = () => {
    // setShowitem(true);
    console.log(orderdata.totalAmount + orderdata.shippingCost);
  };

  return (
    <>
      <p
        className={`pay__button ${
          orderdata.status === 'Yet to confirm'
            ? 'bg-warning'
            : orderdata.status === 'Confirm Order'
            ? 'bg-primary'
            : orderdata.status === 'Reject Order'
            ? 'bg-danger'
            : orderdata.status === 'Delivered'
            ? 'bg-success'
            : orderdata.status === 'Paid'
            ? 'bg-info'
            : ''
        }`}
      >
        {orderdata.status === 'Yet to confirm' ? (
          'Pay after confirmed'
        ) : orderdata.status === 'Confirm Order' ? (
          <span
            onClick={() => handlePayment()}
            className="d-flex justify-content-center w-100"
          >
            Pay Now!
          </span>
        ) : orderdata.status === 'Reject Order' ? (
          'Cancelled'
        ) : orderdata.status === 'Delivered' ? (
          'Delivered'
        ) : orderdata.status === 'Paid' ? (
          'Seller is processing your Order'
        ) : (
          ''
        )}
      </p>
    </>
  );
};

export default PayButton;
