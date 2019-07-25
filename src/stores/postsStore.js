import { action, decorate, observable } from 'mobx';

import Post from '../models/post';

export class PostsStore {
  posts = observable.map({});

  loadPost(postId) {
    let post = this.posts.get(postId);
    if (post) {
      post.load();
    } else {
      post = new Post(postId);
      this.posts.set(postId, post);
    }
  }
}

decorate(Post, {
  loadPost: action
});

const postsStore = new PostsStore();

export default postsStore;
