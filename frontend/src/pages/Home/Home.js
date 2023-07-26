import React from 'react';

import Banner from './Hero/Hero';
import NewArrival from './NewArrivals/NewArrival';
import ShopByCategory from './Collections/Collections';
import { Bar1, Bar2 } from './Stripes/Bars';
import Contact from './Contact/Contact';
import BottomImage from './Stripes/BottomImage';

const Home = ({ Hero, NewArrivals, Collections }) => {
  document.title = 'NRKids | Home';
  return (
    <div className="Parent__Home">
      <Banner Hero={Hero} />
      <NewArrival NewArrivals={NewArrivals} />
      <Bar1 />
      <ShopByCategory Collections={Collections} />
      <Bar2 />
      <Contact />
      <BottomImage Hero={Hero} />
    </div>
  );
};

export default Home;
