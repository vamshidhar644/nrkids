import { useState } from 'react';

import { client } from '../client';

export const FetchSanity = () => {
  const [Hero, setHero] = useState();
  const [NewArrivals, setNewArrivals] = useState();
  const [Collections, setCollections] = useState();
  const [Products, setProducts] = useState();
  const [offerLine, setOfferLine] = useState();

  const fetchHero = async () => {
    try {
      const Hero = await client.fetch('*[_type == "banner"]');
      setHero(Hero);
    } catch (error) {
      console.error('Error fetching first image:', error);
    }
  };

  const fetchNewArrivals = async () => {
    try {
      const NewArrivals = await client.fetch('*[_type == "new-arrivals"]');
      setNewArrivals(NewArrivals);
    } catch (error) {
      console.error('Error fetching first image:', error);
    }
  };

  const fetchCollections = async () => {
    try {
      const Collections = await client.fetch('*[_type == "shopbycategory"]');
      setCollections(Collections);
    } catch (error) {
      console.error('Error fetching first image:', error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const AllProducts = await client.fetch('*[_type == "categories"]');
      setProducts(AllProducts);
    } catch (error) {
      console.error('Error fetching first image:', error);
    }
  };

  const fetchOfferLine = async () => {
    try {
      const offerLine = await client.fetch('*[_type == "offer-text"]');
      setOfferLine(offerLine);
    } catch (error) {
      console.error('Error fetching first image:', error);
    }
  };

  return {
    fetchHero,
    fetchNewArrivals,
    fetchCollections,
    fetchAllProducts,
    fetchOfferLine,
    Hero,
    NewArrivals,
    Collections,
    Products,
    offerLine,
  };
};
