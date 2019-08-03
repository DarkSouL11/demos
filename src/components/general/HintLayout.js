import React from 'react';
import PropTypes from 'prop-types';

import Tappable from './Tappable';

function HintLayout({ message, retryLabel, retryFn }) {
  return (
    <div className="layout">
      <div className="layout-content is-centered pad">
        <p>{message}</p>
        {retryLabel && retryFn && (
          <Tappable className="btn mgn-t" onClick={retryFn}>
            {retryLabel}
          </Tappable>
        )}
      </div>
    </div>
  );
}

HintLayout.defaultProps = {
  retryLabel: 'Try Again'
};

HintLayout.propTypes = {
  message: PropTypes.string.isRequired,
  retryFn: PropTypes.func,
  retryLabel: PropTypes.string
}

export default HintLayout;
