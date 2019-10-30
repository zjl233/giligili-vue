import axios from 'axios';

// 读视频详情
const postUploadAvatar = fileName => axios.post('/api/v1/upload/avatar', { filename: fileName })
  .then(res => res.data);

const postUploadVideo = fileName => axios.post('/api/v1/upload/video', { filename: fileName })
  .then(res => res.data);

export {
  postUploadVideo,
  postUploadAvatar,
};
