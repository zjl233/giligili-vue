import axios from 'axios';

// 获得图片上传的url
const postUploadAvatar = fileName => axios.post('/api/v1/upload/avatar', { filename: fileName })
  .then(res => res.data);

// 获得文件上传与文件读取的url
const postUploadVideo = fileName => axios.post('/api/v1/upload/video', { filename: fileName })
  .then(res => res.data);

// 上传图片的二进制文件
const putImage = (url, file) => axios.put(url, file, {
  headers: { 'content-type': 'image/png' },
});


export {
  postUploadVideo,
  postUploadAvatar,
  putImage,
};
