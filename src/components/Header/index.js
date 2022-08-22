import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
// trocar a importação do SearchBar, se necessário
import SearchBar from '../SearchBar';

export default function Header({ title, haveSearch }) {
  const history = useHistory();
  // const [isSearchVisible, setIsSearchVisible] = useState(false);

  function handleProfileClick() {
    history.push('/profile');
  }

  return (
    <header className="header">
      <button
        type="button"
        onClick={ handleProfileClick }
        className="buttonHeader"
      >
        <img
          src={ profileIcon }
          alt="profile-icon"
          data-testid="profile-top-btn"
        />
      </button>
      <h1 data-testid="page-title">{ title }</h1>
      { haveSearch && (
        <div>

          <button
            type="button"
            data-testid="search-input"
            onClick={ () => setIsSearchVisible((prevState) => !prevState) }
            className="buttonHeader"
          >
            <img
              src={ searchIcon }
              alt="profile icon"
              data-testid="search-top-btn"
            />
          </button>
          <SearchBar />
          <div className="">
            {/* { isSearchVisible && <SearchBar /> }X */}
          </div>
        </div>
      )}

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  haveSearch: PropTypes.bool.isRequired,
};
