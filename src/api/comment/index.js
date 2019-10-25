import axios from 'axios';

// 创建评论
const postComment = form => axios.post('/api/v1/comments', form)
  .then(res => res.data);


// 读取评论列表
const getComments = videoID => axios.get('/api/v1/comments', {
  params: {
    video_id: videoID,
  },
})
  .then(res => res.data);

export {
  postComment,
  getComments,
};
