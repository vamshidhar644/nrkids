import React from 'react';

import Banner from './Hero/Hero';
import NewArrival from './NewArrivals/NewArrival';
import ShopByCategory from './Collections/Collections';
import { Bar1, Bar2 } from './Stripes/Bars';
import Contact from './Contact/Contact';

const Home = ({ Hero, NewArrivals, Collections }) => {
  return (
    <div>
      <Banner Hero={Hero} />

      <h2 style={{ paddingLeft: '50px' }}>New Arrivals</h2>
      <NewArrival NewArrivals={NewArrivals} />
      <Bar1 />
      <ShopByCategory Collections={Collections} />
      <Bar2 />
      <Contact />
    </div>
  );
};

export default Home;
