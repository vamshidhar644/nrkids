import React, { useEffect, useState } from 'react';
import { UseAuthContext } from '../../../hooks/useAuthContext';
import axios from 'axios';

import sanityClient from '@sanity/client';

import ItemSavelater from './ItemSave';

const client = sanityClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
});

const SaveforLaterSection = () => {
  const { user } = UseAuthContext();

  const [saveforlaterData, setSaveforlaterdata] = useState();
  const [sanityData, setSanityData] = useState();

  const [selectSanitySaveforlater, setSelectedSanity] = useState();

  useEffect(() => {
    if (user) {
      const id = user.id;
      axios
        .get(`/api/user/savelater/${id}`)
        .then((response) => {
          setSaveforlaterdata(response.data);
        })
        .catch((error) => {
          console.error('Error fetching document:', error);
        });
    }

    const query1 = `*[_type == "banner"]`;
    const query3 = `*[_type == "categories"]`;

    const fetchData = async () => {
      const data1 = await client.fetch(query1);
      const data3 = await client.fetch(query3);

      const mergedData = [...data1, ...data3];

      setSanityData(mergedData);
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const sanitysavelater = [];
    if (saveforlaterData) {
      for (let i = 0; i < saveforlaterData.length; i++) {
        if (sanityData) {
          for (let j = 0; j < sanityData.length; j++) {
            if (saveforlaterData[i].productId === sanityData[j].productId) {
              sanitysavelater.push(sanityData[j]);
            }
          }
        }
      }
    }
    if (sanitysavelater) {
      setSelectedSanity(sanitysavelater);
    }
  }, [saveforlaterData, sanityData]);

  if (user) {
    return (
      <div className="cart-page">
        <h4>Save for later</h4>
        <div className="cart-items">
          {selectSanitySaveforlater &&
            selectSanitySaveforlater.map((item, index) => {
              return (
                <ItemSavelater
                  key={index}
                  item={item}
                  cartData={saveforlaterData}
                  index={index}
                />
              );
            })}
        </div>
      </div>
    );
  }
};

export default SaveforLaterSection;
