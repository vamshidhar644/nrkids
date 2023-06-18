import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import MainProduct from './MainProduct/MainProduct';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
});

const ProductPage = () => {
  const { product } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const query3 = `*[_type == "categories"]`;

    const fetchData = async () => {
      const data3 = await client.fetch(query3);

      const mergedData = [...data3];

      if (mergedData) {
        for (let i = 0; i < mergedData.length; i++) {
          if (mergedData[i].path.current === product) {
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
