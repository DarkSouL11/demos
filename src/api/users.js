import { apiRequest } from './utils';

function getUsers() {
  return apiRequest('GET', '/users');
}

export default {
  getList: getUsers
}
