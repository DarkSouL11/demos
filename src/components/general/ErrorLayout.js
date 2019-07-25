import React from 'react';
import PropTypes from 'prop-types';

import Tappable from './Tappable';

function ErrorLayout({ message, retryLabel, retryFn }) {
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

ErrorLayout.defaultProps = {
  retryLabel: 'Try Again'
};

ErrorLayout.propTypes = {
  message: PropTypes.string.isRequired,
  retryFn: PropTypes.func,
  retryLabel: PropTypes.string
}

export default ErrorLayout;
