import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

function DetailRow({ icon, title }) {
  return (
    <div className="detail-row">
      <div className="detail-row-icon">
        <Icon name={icon} />
      </div>
      <div className="detail-row-title">
       {title}
      </div>
    </div>
  )
}

DetailRow.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default DetailRow;
