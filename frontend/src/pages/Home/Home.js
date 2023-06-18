import React from 'react';

import Banner from './Banner/Banner';
import NewArrivals from './NewArrivals/NewArrivals';
import ShopByCategory from './Collections/Collections';
// import Reviews from './Reviews/Reviews';
import { Bar1, Bar2 } from './Stripes/Bars';
import Contact from './Contact/Contact';

const Home = () => { 
  return (
    <div>
      <Banner />
      <NewArrivals />
      <Bar1 />
      <ShopByCategory />
      {/* <Reviews /> */}
      <Bar2 />
      <Contact />
    </div>
  );
};

export default Home;
