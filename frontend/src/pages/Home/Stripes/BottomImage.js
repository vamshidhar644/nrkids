import React, { useEffect, useState } from 'react';
import './Bars.css';
import FetchImageUrl from '../../../helpers/FetchImageUrl';

const BottomImage = ({ Hero }) => {
  const { getImageUrl } = FetchImageUrl();
  const [image, setImage] = useState();
  useEffect(() => {
    if (Hero) {
      Hero.forEach((banner) => {
        if (banner.bannerlocation === 'home-bottom') {
          setImage(banner);
        }
      });
    }
  }, [Hero]);

  return (
    <div className="bottom-image">
      {image && (
        <img src={getImageUrl(image.image)} alt="" style={{ width: '100%' }} />
      )}
    </div>
  );
};

export default BottomImage;
