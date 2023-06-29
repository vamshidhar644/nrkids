import React, { useEffect, useState } from 'react';
import './CategoryHero.css';
import { FetchSanity } from '../../../BackOps/FetchSanity';
import { SetPaths } from '../../../BackOps/SetPaths';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';
import { BiChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';

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
      for (let i = 0; i < Hero.length; i++) {
        if (Hero[i].bannerlocation === params) {
          setImage(Hero[i]);
          break;
        } else {
          setImage('');
        }
      }
    }
  }, [Hero, params]);

  return (
    <div className="hero-container p-4">
      <p className="d-flex justify-content-start align-items-center gap-2 small">
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
