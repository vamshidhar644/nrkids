import React, { useEffect, useRef, useState } from 'react';
import './Search.css';
import { FetchSanity } from '../../../helpers/FetchSanity';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import FetchImageUrl from '../../../helpers/FetchImageUrl';

const Search = () => {
  const { fetchAllProducts, Products } = FetchSanity();
  const { getImageUrl } = FetchImageUrl();
  const ulRef = useRef(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isInputFocused, setInputFocus] = useState(false);

  const handleSearch = (event) => {
    setInputFocus(true);
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (Products) {
      const filteredProducts = Products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(filteredProducts.slice(0, 4));
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (ulRef.current && !ulRef.current.contains(event.target)) {
        setInputFocus(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className="search__container">
      <div className="inputBox_container">
        <div className="w-100">
          <input
            id="input-box"
            name="item_list"
            type="text"
            list="Input-box"
            className="inputBox"
            placeholder="Search For Products"
            value={searchTerm}
            onChange={handleSearch}
          />
          {isInputFocused && (
            <ul className="search_suggestions" ref={ulRef}>
              {searchResults.map((product) => (
                <li key={product.productId}>
                  <Link
                    className="w-100"
                    to={`/${product.dropdownField}/${product.path.current}`}
                    onClick={handleSearch}
                  >
                    <img src={getImageUrl(product.images[0])} alt="" />
                    <div className="d-flex flex-column">
                      <b className="m-0">{product.title}</b>
                      <p className="m-0">{product.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <AiOutlineSearch className="search_icon" />
      </div>
    </div>
  );
};

export default Search;
