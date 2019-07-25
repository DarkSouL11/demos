import React from 'react';
import PropTypes from 'prop-types';
import { notify } from 'react-notify-toast';
import compose from 'lodash/fp/compose';

import Card from '../../components/general/Card';
import ErrorLayout from '../../components/general/ErrorLayout';
import Header from '../../components/general/Header';
import Icon from '../../components/general/Icon';
import lifecycle from '../../components/hoc/lifecycle';
import LoadingLayout from '../../components/general/LoadingLayout';
import mobxify from '../../components/hoc/mobxify';
import PageMeta from '../../components/general/PageMeta';
import Tappable from '../../components/general/Tappable';
import { PostsStore } from '../../stores/postsStore';

function CommentItem({ item }) {
  return (
    <div className="col post-comment sep-b">
      <div className="post-comment-user">{item.name}</div>
      <div className="post-comment-body">{item.body}</div>
    </div>
  );
}

function PostPage({
  history,
  match: { params },
  postsStore: store,
  usersStore
}) {
  const post = store.posts.get(params.postId);

  let headerProps = { title: 'Post' };
  if (post && post.isLoaded) {
    headerProps = {
      title: post.data.title,
      backTo: `/user/${post.data.userId}`
    };
  }

  async function handleDelete() {
    try {
      await post.delete();
      const user = usersStore.users.get(post.data.userId.toString());
      if (user) {
        user.setNeedsReset();
      }
      history.replace(`/user/${post.data.userId}`);
      notify.show('Post deleted successfully', 'success', 2000);
    } catch (error) {
      notify.show('Failed to delete post!', 'error', 2000);
    }
  }

  function commentsUi() {
    if (post.areCommentsLoaded) {
      return (
        <div className="row is-tiled">
          {post.comments.map((comment, index) => (
            <CommentItem key={index} item={comment} />
          ))}
        </div>
      );
    } else if (post.areCommentsLoading) {
      return <LoadingLayout />;
    } else if (post.commnetsLoadError) {
      return (
        <ErrorLayout
          message="Failed to load comments"
          retryFn={() => post.loadComments()}
        />
      )
    } else {
      return (
        <ErrorLayout
          message="Click below to load comments"
          retryLabel="Load Comments"
          retryFn={() => post.loadComments()}
        />
      );
    }
  }

  function postUi() {
    return (
      <div className="layout-content post">
        <Card className="mgn-b">
          <div className="title mgn-b">{post.data.title}</div>
          <p className="mgn-b">{post.data.body}</p>
          <Tappable
            className="tappable btn btn-danger btn-small"
            disabled={post.isSubmitting}
            onClick={handleDelete}
          >
            <Icon className="mgn-r" name="delete" />
            Delete Post
          </Tappable>
        </Card>
        <Card>
          <div className="title mgn-b">Comments</div>
          {commentsUi()}
        </Card>
      </div>
    );
  }

  function ui() {
    if (!post) {
      return null;
    } else if (post.isLoaded) {
      return postUi();
    } else if (post.isLoading) {
      return <LoadingLayout />;
    } else if (post.loadError) {
      return (
        <ErrorLayout
          message="Failed to load blog post"
          retryFn={() => store.loadPost(params.postId)}
        />
      );
    }
  }

  return (
    <div className="layout">
      <PageMeta title="Post" />
      <Header {...headerProps} />
      {ui()}
    </div>
  );
}

PostPage.propTypes = {
  match: PropTypes.object.isRequired,
  postsStore: PropTypes.instanceOf(PostsStore)
};

const hoc = compose(
  mobxify('postsStore'),
  lifecycle({
    componentDidMount() {
      const { postsStore: store, match: { params } } = this.props;
      store.loadPost(params.postId);
    }
  }),
  mobxify('postsStore', 'usersStore'),
)

export default hoc(PostPage);
