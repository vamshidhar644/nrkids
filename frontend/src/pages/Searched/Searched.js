import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { BiChevronRight } from 'react-icons/bi';

import './Searched.css';
import ProductCard from '../Components/ProductCard/ProductCard';
import { FetchSanity } from '../../helpers/FetchSanity';
import { SetPaths } from '../../helpers/SetPaths';
import FetchImageUrl from '../../helpers/FetchImageUrl';

const Searched = () => {
  const { searched } = useParams();
  return <div>{searched}</div>;
};

export default Searched;
