import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../../../images/shareIcon.svg';

function ShareButton({ dataTest, path }) {
  const { pathname } = useLocation();

  const [copied, setCopied] = useState(false);

  const handleClickShare = () => {
    copy(`http://localhost:3000${path || pathname.replace('/in-progress', '')}`);
    setCopied(true);
  };

  return (
    <div>
      <button
        data-testid={ dataTest }
        type="button"
        onClick={ handleClickShare }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="Share" />
      </button>
      { copied && <p>Link copied!</p> }
    </div>
  );
}

ShareButton.propTypes = {
  dataTest: PropTypes.string,
  path: PropTypes.string,
};

ShareButton.defaultProps = {
  dataTest: 'share-btn',
  path: undefined,
};

export default ShareButton;
