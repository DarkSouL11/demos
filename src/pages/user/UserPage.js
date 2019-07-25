
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import Card from '../../components/general/Card';
import ErrorLayout from '../../components/general/ErrorLayout';
import Header from '../../components/general/Header';
import lifecycle from '../../components/hoc/lifecycle';
import LoadingLayout from '../../components/general/LoadingLayout';
import mobxify from '../../components/hoc/mobxify';
import PageMeta from '../../components/general/PageMeta';
import Pagination from './Pagination';
import { UsersStore } from '../../stores/usersStore';
import Tappable from '../../components/general/Tappable';

function PostItem({ item }) {
  return (
    <div className="col">
      <Card>
        <p className="title mgn-b">{item.title}</p>
        <Tappable
          className="btn btn-inverted btn-small"
          component={Link}
          to={`/post/${item.id}`}
        >
          Read More
        </Tappable>
      </Card>
    </div>
  );
}

function UserPage({ usersStore: store, match: { params } }) {
  const pageNum = params.pageNum ? parseInt(params.pageNum, 10) : 1;
  const user = store.users.get(params.userId);

  function pageUi() {
    if (user.data.length === 0) {
      return <ErrorLayout message="No posts available" />;
    } else {
      return (
        <div className="layout-content">
          <div className="row is-tiled">
            {user.data.map((item, index) =>
              <PostItem key={index} item={item} />)}
          </div>
          <Pagination user={user} />
        </div>
      );
    }
  }

  function ui() {
    if (!user) {
      return null
    } else if (user.isPageLoaded) {
      // Placing the above condition before all other conditions shows content
      // if already available and silently updates when new data is available.
      return pageUi();
    } else if (user.isLoading) {
      return <LoadingLayout />;
    } else if (user.loadError) {
      return (
        <ErrorLayout
          message="Failed to load user posts"
          retryFn={() => user.load(pageNum)}
        />
      );
    } else {
      return null
    }
  }

  return (
    <div className="layout">
      <PageMeta title="Posts" />
      <Header backTo="/" title="Blog | Posts" />
      {ui()}
    </div>
  );
}

UserPage.propTypes = {
  match: PropTypes.object.isRequired,
  usersStore: PropTypes.instanceOf(UsersStore).isRequired
};

const hoc = compose(
  mobxify('usersStore'),
  lifecycle({
    componentDidMount() {
      const { usersStore: store, match: { params } } = this.props;
      const pageNum = params.pageNum ? parseInt(params.pageNum, 10) : 1;
      store.loadUser(params.userId, pageNum);
    }
  }),
  mobxify('usersStore')
)

export default hoc(UserPage);
