import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Card({ className, square, ...remainingProps }) {
  return (
    <div
      className={classNames(
        'card',
        { 'is-square': square },
        { [className]: className },

      )}
      {...remainingProps}
    />
  );
}

Card.propTypes = {
  className: PropTypes.string,
  square: PropTypes.bool
};

export default Card;

