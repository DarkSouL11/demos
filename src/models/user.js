import { action, computed, decorate, flow, observable } from 'mobx';

import postsApi from '../api/posts';

class User {
  isLoading = false;
  loadError = true;
  needsReset = false;
  pageNum = 1;
  pages = observable.map({});

  constructor(id, pageNum) {
    this.id = id;
    this.load(pageNum);
  }

  load = flow(function * (pageNum){
    // Set below flag when you are sure that data has changed on server.
    // For example after deleting a post.
    if (this.needsReset) {
      this.pages.clear();
      this.needsReset = false;
    }

    this.pageNum = pageNum;
    this.isLoading = true;
    this.loadError = null;
    try {
      const json = yield postsApi.getList(this.id, pageNum);
      this.pages.set(pageNum, json);
      this.isLoading = false;
    } catch (error) {
      this.loadError = error;
      this.isLoading = false;
    }
  });

  setNeedsReset() {
    this.needsReset = true;
  }

  get data() {
    return this.pages.get(this.pageNum);
  }

  get isPageLoaded() {
    return !!this.data;
  }
}

decorate(User, {
  data: computed,
  isPageLoaded: computed,
  isLoading: observable,
  loadError: observable,
  needsReset: observable,
  pageNum: observable,
  setNeedsReset: action
});

export default User;
