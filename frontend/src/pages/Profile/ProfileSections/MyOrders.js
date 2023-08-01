import React, { useEffect, useState } from 'react';
import { FetchMongo } from '../../../helpers/FetchMongo';
import './MyOrders.css';
import { FetchSanity } from '../../../helpers/FetchSanity';
import FetchImageUrl from '../../../helpers/FetchImageUrl';
import FilterSanity from '../../../helpers/FilterSanity';
import { Link } from 'react-router-dom';

import Loader from '../../../Components/Loader/Loader';
import PayButton from '../Payment/PayButton';

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
      // onClick={onClick}
    >
      <div className="accordion-title" onClick={onClick}>
        <p className="m-0 small">order ID - {orderdata._id}</p>
        <p className="m-0">
          {orderdata.status === 'Yet to confirm'
            ? 'Not confirmed yet'
            : orderdata.status === 'Confirm Order'
            ? 'Confirmed'
            : orderdata.status === 'Reject Order'
            ? 'Cancelled'
            : orderdata.status === 'Delivered'
            ? 'Delivered'
            : orderdata.status === 'Paid'
            ? 'Paid'
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
                      <Link
                        to={`/${filteredItems[i].dropdownField}/${filteredItems[i].path.current}`}
                        className="ordered-item"
                        key={i}
                        onClick={() =>
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                          })
                        }
                      >
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
                          <p>{filteredItems[i].description}</p>
                          <p>
                            {item.size} - {item.quantity}
                          </p>
                          <p>₹ {item.price}.00</p>
                        </div>
                      </Link>
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

          <div className="orders__box order__summary">
            <h4 style={{ marginBlockStart: '1em', marginTop: '0px' }}>
              Order Summary
            </h4>
            <hr />
            <p>
              Sub Total: <span>₹ {orderdata.totalAmount}.00</span>
            </p>
            <p>
              Delivery cost: <span>₹ {orderdata.shippingCost}.00</span>
            </p>
            <hr />
            <p>
              <b>Total Amount</b>
              <b>₹ {orderdata.totalAmount + orderdata.shippingCost}.00</b>
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
    <Loader />
  );
};

export default Accordion;
