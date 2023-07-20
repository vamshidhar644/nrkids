import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';

import { FetchSanity } from '../../BackOps/FetchSanity';
import { SetPaths } from '../../BackOps/SetPaths';
import FetchImageUrl from '../../BackOps/FetchImageUrl';

const CategoryHero = ({ params }) => {
  const { fetchHero, Hero } = FetchSanity();
  const { getImageUrl } = FetchImageUrl();
  const { setCategoryPath, categorypath } = SetPaths();

  const [image, setImage] = useState();

  useEffect(() => {
    fetchHero();
    setCategoryPath(params);
  }, [params]);

  useEffect(() => {
    if (Hero) {
      Hero.forEach((banner) => {
        if (banner.bannerlocation === params) {
          setImage(banner);
        }
      });
    }
  }, [Hero, params]);

  return (
    <div className="hero-container p-4">
      <p className="d-flex justify-content-start align-items-center gap-2">
        <Link to="/">Home </Link>
        <BiChevronRight /> {categorypath}
      </p>
      {image && (
        <img src={getImageUrl(image.image)} alt="" style={{ width: '100%' }} />
      )}
    </div>
  );
};

export default CategoryHero;
