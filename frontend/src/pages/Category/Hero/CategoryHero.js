import React, { useEffect, useState } from 'react';
import './CategoryHero.css';
import { FetchSanity } from '../../../BackOps/FetchSanity';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';
import { BiChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const CategoryHero = ({ params }) => {
  const { fetchHero, Hero } = FetchSanity();
  const { getImageUrl } = FetchImageUrl();
  const [image, setImage] = useState();

  const [currentPath, setCurrentPath] = useState('');
  useEffect(() => {
    fetchHero();
  }, []);

  useEffect(() => {
    if (Hero) {
      for (let i = 0; i < Hero.length; i++) {
        if (Hero[i].bannerlocation === params) {
          setImage(Hero[i]);
        }
      }
    }
  }, [Hero, params]);

  useEffect(() => {
    switch (params) {
      case 'birthday':
        setCurrentPath('Birthday');
        break;
      case 'new-arrivals':
        setCurrentPath('New Arrivals');
        break;
      case 'ethnic-wear':
        setCurrentPath('Ethnic wear');
        break;
      case 'party-wear':
        setCurrentPath('Party wear');
        break;
      case 'casual-wear':
        setCurrentPath('Casual wear');
        break;
      case 'mom-and-me':
        setCurrentPath('Mom & me');
        break;
      case 'siblings-set':
        setCurrentPath('Siblings set');
        break;
      default:
    }
  }, [params]);
  return (
    <div className="hero-container">
      <p>
        <Link to="/">Home </Link>
        <BiChevronRight /> {currentPath}
      </p>
      {image && (
        <img src={getImageUrl(image.image)} alt="" style={{ width: '100%' }} />
      )}
    </div>
  );
};

export default CategoryHero;
