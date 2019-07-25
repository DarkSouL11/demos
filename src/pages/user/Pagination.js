import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import Icon from '../../components/general/Icon';
import Tappable from '../../components/general/Tappable';
import User from '../../models/user';

function Pagination({ user }) {
  if (user.data.length > 0) {
    return (
      <div className="pagination">
        <div className="pagination-item">
          <Tappable
            className="btn btn-small btn-round"
            component={Link}
            disabled={user.pageNum === 1}
            to={`/user/${user.id}/${user.pageNum - 1}`}
          >
            <Icon name="chevron_left" />
          </Tappable>
        </div>
        <div className="pagination-item">
          <p>Page {user.pageNum}</p>
        </div>
        <div className="pagination-item">
          <Tappable
            className="btn btn-small btn-round"
            component={Link}
            to={`/user/${user.id}/${user.pageNum + 1}`}
          >
            <Icon name="chevron_right" />
          </Tappable>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

Pagination.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default observer(Pagination);
