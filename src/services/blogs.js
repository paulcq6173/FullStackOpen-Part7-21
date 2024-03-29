import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);

  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const getBlogById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);

  return response.data;
};

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject);

  return response.data;
};

const deleteBlogById = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};

const createComment = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    `${baseUrl}/${newObject.blogId}/comments`,
    newObject,
    config
  );

  return response.data;
};

const getBlogComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`);

  return response.data;
};

export default {
  create,
  getAll,
  getBlogById,
  update,
  deleteBlogById,
  createComment,
  getBlogComments,
  setToken,
};
