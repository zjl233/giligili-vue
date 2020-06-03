import axios from 'axios';

// 创建视频
const postAlbum = form => axios.post('/api/v1/albums', form).then(res => res.data);

// 读视频详情
const getAlbum = id => axios.get(`/api/v1/album/${id}`).then(res => res.data);

// 读取视频列表
const getAlbums = (start, limit) => axios.get('/api/v1/albums', { params: { start, limit } }).then(res => res.data);


// 读取本用户的视频列表
const getUserAlbums = (start, limit) => axios.get('/api/v1/user/albums', { params: { start, limit } }).then(res => res.data);


// 搜索ℹ相册列表，通过 name 和 category
const searchAlbums = (name, category) => axios.get('/api/v1/albums/search', { params: { name, category } }).then(res => res.data);

export {
  getAlbums,
  getAlbum,
  postAlbum,
  getUserAlbums,
  searchAlbums,
};
