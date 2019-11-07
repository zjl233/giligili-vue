import axios from 'axios';

// 读视频详情
const login = form => axios.post('/api/v1/login', form)
  .then(res => res.data);


const register = form => axios.post('/api/v1/register', form)
  .then(res => res.data);


const userShow = userName => axios.get(`/api/v1/users/${userName}`)
  .then(res => res.data);


export {
  login,
  register,
  userShow,
};
