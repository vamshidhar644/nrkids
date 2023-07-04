import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Nextpage.css';
const Nextpage = () => {
  const nextpage = useParams();

  return <div className="Nextpage-container">{nextpage.nextpage}</div>;
};

export default Nextpage;
