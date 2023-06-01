import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SanityClient from '../client';
import '../Styles/ShopByCategory/MainPage.css'
import Products from '../Components/ShopByCategory/Products';

const Categories = () => {
  const { categorypath } = useParams();

  const [data, setData] = useState([]);
  const [categoryProducts, setCatogeryProducts] = useState([]);

  // console.log(categorypath);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Sanity.io
        const response = await SanityClient.fetch('*[_type == "categories"]');
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const CategoryProducts = [];

    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].dropdownField === categorypath) {
          CategoryProducts.push(data[i]);
        }
      }
    }
    setCatogeryProducts(CategoryProducts);
  }, [categorypath, data]);

  if (categoryProducts) {
    console.log(categoryProducts);
  }

  return (
    <div className='Main-Category-Container'>
      <div className='filter-container'>

      </div>
      <div className='products-container'>
        <Products categoryProducts={categoryProducts}/>
      </div>
    </div>
  );
};

export default Categories;
