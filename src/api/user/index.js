import axios from 'axios';

// 读视频详情
const login = form => axios.post('/api/v1/user/login', form)
  .then(res => res.data);


const register = form => axios.post('/api/v1/user/register', form)
  .then(res => res.data);


export {
  login,
  register,
};
