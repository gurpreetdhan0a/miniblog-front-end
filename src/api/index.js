import axios from 'axios';

const url = 'https://miniblog-project.herokuapp.com/posts';

export const fetchPost = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const deletePost =(id) => axios.delete(`${url}/${id}`);
export const likePost = (id) =>axios.patch(`${url}/${id}/likePost`);
export const unLikePost = (id) => axios.patch(`${url}/${id}/unLikePost`);