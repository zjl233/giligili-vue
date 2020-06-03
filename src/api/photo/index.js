import axios from 'axios';


// 读取视频列表
const getPhotos = (start, limit) => axios.get('/api/v1/photos', { params: { start, limit } }).then(res => res.data);

// 读视频详情
const deletePhoto = id => axios.delete(`/api/v1/photo/${id}`).then(res => res.data);


// 搜索ℹ相册列表，通过 name
const searchPhotos = name => axios.get('/api/v1/photos/search', { params: { name } }).then(res => res.data);

export {
  getPhotos,
  deletePhoto,
  searchPhotos,
};
