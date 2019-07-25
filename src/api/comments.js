import { apiRequest } from './utils';

function getComments(postId) {
  const params = { postId };
  return apiRequest('GET', '/comments', null, { params });
}

export default {
  getList: getComments
}
