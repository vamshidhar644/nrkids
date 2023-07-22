import React, { useEffect, useState } from 'react';
import { FetchMongo } from '../../../BackOps/FetchMongo';
import './MyOrders.css';
import { FetchSanity } from '../../../BackOps/FetchSanity';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';
import FilterSanity from '../../../BackOps/FilterSanity';

const PayButton = ({ orderdata }) => {
  const handlePayment = () => {};
  return (
    <p
      className={`pay__button ${
        orderdata.status === 'Yet to confirm'
          ? 'bg-warning'
          : orderdata.status === 'Confirm Order'
          ? 'bg-primary'
          : orderdata.status === 'Cancel Order'
          ? 'bg-danger'
          : orderdata.status === 'Delivered'
          ? 'bg-success'
          : ''
      }`}
    >
      {orderdata.status === 'Yet to confirm' ? (
        'Pay after confirmed'
      ) : orderdata.status === 'Confirm Order' ? (
        <span onClick={() => handlePayment()}>Pay Now!</span>
      ) : orderdata.status === 'Cancel Order' ? (
        'Cancelled'
      ) : orderdata.status === 'Delivered' ? (
        'Delivered'
      ) : (
        ''
      )}
    </p>
  );
};

const AccordionItem = ({ orderdata, isOpen, onClick }) => {
  const dateStr = orderdata.orderedDate;
  const dateObj = new Date(dateStr);

  const { filtersanity, filteredItems } = FilterSanity();

  const { fetchAllProducts, Products } = FetchSanity();

  const { getImageUrl } = FetchImageUrl();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (orderdata.items && Products) {
      filtersanity(orderdata.items, Products);
    }
  }, [Products]);

  // Options for the date format
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  // Convert the date to the desired format
  const formattedDate = dateObj.toLocaleDateString(undefined, options);
  return (
    <div
      className={`accordion-item ${isOpen ? 'open' : ''} `}
      onClick={onClick}
    >
      <div className="accordion-title">
        <strong>#{orderdata._id}</strong>
        <p className="m-0">
          {orderdata.status === 'Yet to confirm'
            ? 'Not confirmed yet'
            : orderdata.status === 'Confirm Order'
            ? 'Confirmed'
            : orderdata.status === 'Cancel Order'
            ? 'Cancelled'
            : orderdata.status === 'Delivered'
            ? 'Delivered'
            : ''}
        </p>
      </div>
      {isOpen && (
        <div className="accordion-content">
          <div className="mobile__pay_button">
            <PayButton orderdata={orderdata} />
          </div>
          <div className="orders__box">
            <h4 style={{ marginBlockStart: '1em', marginTop: '0px' }}>
              Orders
            </h4>
            <hr />
            <div className="items-container">
              {orderdata.items && filteredItems
                ? orderdata.items.map((item, i) => {
                    return (
                      <div className="ordered-item" key={i}>
                        <div className="item-image">
                          <img
                            src={getImageUrl(filteredItems[i].images[0])}
                            alt=""
                          />
                        </div>
                        <div className="item-info small">
                          <p>
                            <strong>
                              {filteredItems && filteredItems[i].title}
                            </strong>
                          </p>
                          <p>Description</p>
                          <p>
                            {item.size} - {item.quantity}
                          </p>
                          <p>
                            <b>₹ {item.price}</b>
                          </p>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          <div className="orders__box">
            <h4 style={{ marginBlockStart: '1em', marginTop: '0px' }}>
              Address
            </h4>
            <hr />
            <p>
              <strong>{orderdata.orderedName}</strong>
            </p>
            <p className="m-0">{formattedDate}</p>
            <p className="m-0 small">{orderdata.orderedEmail}</p>
            <p className="m-0">{orderdata.orderedAddress}</p>
            <p className="m-0">{orderdata.orderedLocality}</p>
            <p className="m-0 d-flex gap-2">
              {orderdata.orderedState}
              <span>{orderdata.orderedPincode}</span>
            </p>
            <p className="m-0 mt-2">Mobile {orderdata.orderedMobile}</p>
          </div>

          <div className="orders__box">
            <h4 style={{ marginBlockStart: '1em', marginTop: '0px' }}>
              Order Summary
            </h4>
            <hr />
            <p>Sub Total: ₹ {orderdata.totalAmount}.00</p>
            <p>Delivery cost: ₹ {orderdata.shippingCost}.00</p>
            <p>
              <b>
                Total Amount:&nbsp;&nbsp; ₹{' '}
                {orderdata.totalAmount + orderdata.shippingCost}
                .00
              </b>
            </p>
            <PayButton orderdata={orderdata} />
          </div>
        </div>
      )}
    </div>
  );
};

const Accordion = () => {
  const { fetchOrders, orders } = FetchMongo();

  useEffect(() => {
    fetchOrders();
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return orders ? (
    <div className="accordion">
      {orders.map((order, index) => (
        <AccordionItem
          key={index}
          orderdata={order}
          isOpen={activeIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  ) : (
    <>Loading...</>
  );
};

export default Accordion;
