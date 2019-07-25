import { action, computed, decorate, flow, observable } from 'mobx';

import User from '../models/user';
import usersApi from '../api/users';

export class UsersStore {
  isLoading = false;
  loadError = null;
  list = null;
  users = observable.map({});

  load = flow(function * () {
    this.isLoading = true;
    this.loadError = null;

    try {
      const json = yield usersApi.getList();
      this.list = json;
      this.isLoading = false;
    } catch (error) {
      this.loadError = error;
      this.isLoading = false;
    }
  });

  loadUser(userId, pageNum) {
    let user = this.users.get(userId);
    if (user) {
      user.load(pageNum);
    } else {
      user = new User(userId, pageNum);
      this.users.set(userId, user);
    }
  }

  get isLoaded() {
    return !!this.list;
  }
}

decorate(UsersStore, {
  isLoaded: computed,
  isLoading: observable,
  list: observable,
  loadError: observable,
  loadUser: action
});

const usersStore = new UsersStore();

export default usersStore;
