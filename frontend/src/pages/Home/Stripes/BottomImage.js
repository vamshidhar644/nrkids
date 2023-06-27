import React, { useEffect, useState } from 'react';
import './Bars.css'
import FetchImageUrl from '../../../BackOps/FetchImageUrl';

const BottomImage = ({ Hero }) => {
  const { getImageUrl } = FetchImageUrl();
  const [image, setImage] = useState();
  useEffect(() => {
    if (Hero) {
      for (let i = 0; i < Hero.length; i++) {
        if (Hero[i].bannerlocation === 'home-bottom') {
          setImage(Hero[i]);
        }
      }
    }
  }, [Hero]);

  return (
    <div className='bottom-image'>
      {image && (
        <img src={getImageUrl(image.image)} alt="" style={{ width: '100%' }} />
      )}
    </div>
  );
};

export default BottomImage;
