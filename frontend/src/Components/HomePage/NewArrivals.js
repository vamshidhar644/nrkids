import React, { useEffect, useState } from 'react';
import '../../Styles/HomePage/NewArrivals.css';

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { NavLink } from 'react-router-dom';

const client = sanityClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
});

const builder = imageUrlBuilder(client);

const NewArrivals = () => {
  const [NewArrivals, setNewArrivals] = useState(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const NewArrivals = await client.fetch('*[_type == "new-arrivals"]');

        setNewArrivals(NewArrivals);
      } catch (error) {
        console.error('Error fetching first image:', error);
      }
    };

    fetchNewArrivals();
  }, []);

  const getImageUrl = (image) => {
    return builder.image(image).url();
  };

  return (
    <div className="New-Arrivals">
      <h2>New Arrivals</h2>
      <div className="Cards-Container">
        {NewArrivals &&
          NewArrivals.map((newarrivals) => {
            return (
              <div className="Main-Card" key={newarrivals.title}>
                <NavLink
                  className="card"
                  to={`/new-arrivals/${newarrivals.path}`}
                  state={{
                    data: newarrivals,
                  }}
                >
                  <img
                    className="image1"
                    src={getImageUrl(newarrivals.images[0])}
                    alt=""
                  />
                  <img
                    className="image2"
                    src={getImageUrl(newarrivals.images[1])}
                    alt=""
                  />
                </NavLink>
                <p className="title">{newarrivals.title}</p>
                <p className="price">From Rs.{newarrivals.price}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NewArrivals;
