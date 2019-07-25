import { computed, decorate, flow, observable } from 'mobx';

import commentsApi from '../api/comments';
import postsApi from '../api/posts';

class Post {
  comments = null;
  data = null;
  isLoading = false;
  loadError = null;
  isSubmitting = false;
  areCommentsLoading = false;
  commnetsLoadError = false;

  constructor(id) {
    this.id = id;
    this.load();
  }

  // Use `forceServer = true` if you want to update cached data
  load = flow(function * (forceServer = false){
    if (!this.isLoaded || forceServer) {
      this.isLoading = true;
      this.loadError = null;
      try {
        const json = yield postsApi.get(this.id);
        this.data = json;
        this.isLoading = false;
      } catch (error) {
        this.loadError = error;
        this.isLoading = false;
      }
    }

    // If comments are already loaded then try to refresh them
    if (this.areCommentsLoaded) this.loadComments();
  });

  loadComments = flow(function * () {
    this.areCommentsLoading = true;
    this.commnetsLoadError = null;
    try {
      const json = yield commentsApi.getList(this.id);
      this.comments = json;
      this.areCommentsLoading = false;
    } catch (error) {
      this.commnetsLoadError = error;
      this.areCommentsLoading = false;
    }
  });

  delete = flow(function * () {
    this.isSubmitting = true;
    try {
      yield postsApi.delete(this.id);
      this.isSubmitting = false;
    } catch (error) {
      this.isSubmitting = false;
      throw error;
    }
  });

  get areCommentsLoaded() {
    return !!this.comments;
  }

  get isLoaded() {
    return !!this.data;
  }
}

decorate(Post, {
  areCommentsLoaded: computed,
  areCommentsLoading: observable,
  comments: observable,
  commnetsLoadError: observable,
  data: observable,
  isLoaded: computed,
  isLoading: observable,
  isSubmitting: observable,
  loadError: observable
});

export default Post;
