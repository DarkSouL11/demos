import config from '../utils/config';
import { apiRequest } from './utils';

function getSkip(pageNum) {
  return config.PAGE_LIMIT * (pageNum - 1);
}

function getPost(id) {
  return apiRequest('GET', `/posts/${id}`);
}

function getPosts(userId, pageNum = 1) {
  const skip = getSkip(pageNum);
  const limit = config.PAGE_LIMIT;
  const params = { skip, limit, userId };
  return apiRequest('GET', '/posts', null, { params });
}

function deletePost(id) {
  return apiRequest('DELETE', `/posts/${id}`);
}

export default {
  delete: deletePost,
  get: getPost,
  getList: getPosts
}
