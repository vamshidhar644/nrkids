import React from 'react';
import '../Styles/Home.css';
import Banner from '../Components/Banner';
import NewArrivals from '../Components/NewArrivals';
import ShopByCategory from '../Components/ShopByCategory';
import Reviews from '../Components/Reviews';
import { Bar1, Bar2 } from '../Components/Bars';
import Contact from '../Components/Contact';

const Home = () => {
  return (
    <div>
      <Banner />
      <NewArrivals />
      <Bar1 />
      <ShopByCategory />
      <Reviews />
      <Bar2 />
      <Contact/>
    </div>
  );
};

export default Home;
