import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Nextpage.css';
import { client } from '../../../client';
import BlockContent from '@sanity/block-content-to-react';

const Next = () => {
  const [data, setTerms] = useState();

  const nextpage = useParams();

  console.log(nextpage);

  useEffect(() => {
    client.fetch(`*[_type == "${nextpage.nextpage}"]`).then((data) => {
      setTerms(data);
    });
  }, [nextpage]);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="accordion__terms">
      {nextpage.nextpage === 'terms-and-conditions'
        ? data.map((data, index) => {
            return (
              <div
                className={`accordion-item ${
                  activeIndex === index ? 'open' : ''
                } `}
                onClick={() => handleItemClick(index)}
              >
                <div className="accordion-title">{data.title}</div>
                {activeIndex === index && (
                  <BlockContent blocks={data.longTextContent} />
                )}
              </div>
            );
          })
        : data.map((data) => {
            return (
              <div className="accordion-item">
                <div className="accordion-title">{data.title}</div>
                <BlockContent blocks={data.longTextContent} />
              </div>
            );
          })}
    </div>
  );
};

export default Next;
