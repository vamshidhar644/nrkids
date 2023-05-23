import React from 'react';
import '../Styles/Home.css';
import Banner from '../Components/Banner';
import NewArrivals from '../Components/NewArrivals';
import Bar1 from '../Components/Bar1';
import ShopByCategory from '../Components/ShopByCategory';
import Reviews from '../Components/Reviews';
import Bar2 from '../Components/Bar2';

const Home = () => {
  return (
    <div>
      <Banner />
      <NewArrivals />
      <Bar1 />
      <ShopByCategory />
      <Reviews />
      <Bar2/>
    </div>
  );
};

export default Home;
