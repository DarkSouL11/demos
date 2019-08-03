import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from './Icon';
import Tappable from './Tappable';

function Header({ title, backTo }) {
  return (
    <div className="layout-header">
      {backTo && (
        <div className="layout-header-item">
          <Tappable
            className="btn btn-small"
            component={Link}
            to={backTo}
          >
            <Icon name="arrow_back" />
          </Tappable>
        </div>
      )}
      <div className="layout-header-item layout-header-title">
        {title || 'Blog'}
      </div>
    </div>
  )
}

Header.propTypes = {
  backTo: PropTypes.string,
  title: PropTypes.string
};

export default Header;
