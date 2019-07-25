import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import Card from '../../components/general/Card';
import DetailRow from '../../components/general/DetailRow';
import ErrorLayout from '../../components/general/ErrorLayout';
import Header from '../../components/general/Header';
import lifecycle from '../../components/hoc/lifecycle';
import LoadingLayout from '../../components/general/LoadingLayout';
import mobxify from '../../components/hoc/mobxify';
import PageMeta from '../../components/general/PageMeta';
import Tappable from '../../components/general/Tappable';
import { UsersStore } from '../../stores/usersStore';

function UserItem({ item }) {
  return (
    <div className="col is-2-tablet is-3-desktop">
      <Card className="user-item">
        <p className="title mgn-b">{item.name}</p>
        <DetailRow icon="work" title={item.company.name} />
        <DetailRow icon="phone" title={item.phone} />
        <DetailRow icon="link" title={item.website} />
        <div className="user-actions mgn-t">
          <Tappable
            className="btn btn-inverted btn-small"
            component={Link}
            to={`/user/${item.id}`}
          >
            See Posts
          </Tappable>
        </div>
      </Card>
    </div>
  );
}

function HomePage({ usersStore: store }) {
  function usersUi() {
    return (
      <div className="layout">
        <div className="layout-content">
          <div className="row is-tiled">
            {store.list.map((user, index) => (
              <UserItem
                key={index}
                item={user}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  function ui() {
    if (store.isLoaded) {
      if (store.list.length === 0) {
        return <ErrorLayout message="No users available" />;
      } else {
        return usersUi();
      }
    } else if (store.isLoading) {
      return <LoadingLayout />;
    } else if (store.loadError) {
      return (
        <ErrorLayout
          message="Failed to load users"
          retryFn={() => store.load()}
        />
      );
    } else {
      return null;
    }
  }

  return (
    <div className="layout">
      <PageMeta title="All Users" />
      <Header title="Blog | Users" />
      {ui()}
    </div>
  );
}

HomePage.propTypes = {
  usersStore: PropTypes.instanceOf(UsersStore).isRequired
};

const hoc = compose(
  mobxify('usersStore'),
  lifecycle({
    componentDidMount() {
      const { usersStore } = this.props;
      usersStore.load();
    }
  }),
  mobxify('usersStore'),
);

export default hoc(HomePage);
