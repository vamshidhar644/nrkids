import React from 'react';
import '../Styles/HomePage/Home.css';
import Banner from '../Components/HomePage/Banner';
import NewArrivals from '../Components/HomePage/NewArrivals';
import ShopByCategory from '../Components/HomePage/ShopByCategory';
import Reviews from '../Components/HomePage/Reviews';
import { Bar1, Bar2 } from '../Components/HomePage/Bars';
import Contact from '../Components/HomePage/Contact';

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
