import { useEffect, useState } from 'react';

import '../Styles/ProductPage/MainPage.css';
import { useParams } from 'react-router-dom';
import MainProduct from '../Components/ProductPage/MainProduct';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
});

const ProductPage = () => {
  const { product } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const query1 = `*[_type == "banner"]`;
    // const query2 = `*[_type == "new-arrivals"]`;
    const query3 = `*[_type == "categories"]`;

    const fetchData = async () => {
      const data1 = await client.fetch(query1);
      // const data2 = await client.fetch(query2);
      const data3 = await client.fetch(query3);

      const mergedData = [...data1, ...data3];

      if (mergedData) {
        for (let i = 0; i < mergedData.length; i++) {
          if (mergedData[i].path === product) {
            setData(mergedData[i]);
          }
        }
      }
    };

    fetchData();
  });

  if (data.length !== 0) {
    return (
      <div>
        <MainProduct Product={data} />
      </div>
    );
  }
};

export default ProductPage;
