<template>
  <div class="post-video">
    <div class="video-header">
      <h2>{{video.title}}</h2>
      <div class="video-data">
        {{video.created_at | moment('YYYY-MM-DD h:mm:ss') }}创建 ·
        {{video.view}}观赏
      </div>
    </div>
    <video-player
      class="video-player-box"
      :options="playerOptions">
    </video-player>
    <div class="video-info">
      <pre>{{video.info}}</pre>
    </div>
    <div id="comment-list-box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="评论">
          <el-input type="textarea" v-model="form.info"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
      <div id="comment-list">
        <div class="comment" v-for="(item, i) in comments" :key="item.id">
          <div class="comment-info">
            {{i+1}}楼
            作者
            {{ item.created_at | moment('YYYY-MM-DD h:mm:ss')}}
          </div>
          <div class="comment-content">{{item.info}}</div>
          <div class="comment-action">
            <i class="el-icon-edit"></i>
            <span class="add-comment" @click="toggleReplyForm(item.id)">回复</span>
            <div class="reply-dialog" v-if="showFormID === item.id">
              <el-form ref="form" :model="reply" label-width="80px">
                <el-form-item label="活动名称">
                  <el-input v-model="reply.info" placeholder="请输入回复"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="createReply(item.id)">立即创建</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="reply-list">
            <div class="comment" v-for="r in item.replies" :key="r.id">
              <div class="comment-info">
                {{ r.created_at | moment('YYYY-MM-DD h:mm:ss')}}
              </div>
              <div class="comment-content">{{r.info}}</div>
              <div class="comment-action">
                <i class="el-icon-edit"></i>
                <span class="add-comment" @click="toggleReplyForm(r.id)">回复</span>
                <div class="reply-dialog" v-if="showFormID === r.id">
                  <el-form ref="form" :model="reply" label-width="80px">
                    <el-form-item label="活动名称">
                      <el-input v-model="reply.info" placeholder="请输入回复"></el-input>
                    </el-form-item>
                    <el-form-item>
<!--                       comment have most 2 level, use @replayTo to build thread comment-->
                      <el-button type="primary" @click="createReply(item.id)">立即创建</el-button>
                      <el-button>取消</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import * as API from '@/api/video/';
import * as commentAPI from '@/api/comment/';

export default {
  name: 'ShowVideo',
  data() {
    return {
      video: {},
      playerOptions: {
        fluid: true,
        autoplay: false,
        sources: [{
          type: 'video/mp4',
          src: '',
        }],
      },
      form: {
        video_id: this.$route.params.videoID.toString(),
        info: '',
      },
      reply: {
        video_id: this.$route.params.videoID.toString(),
        info: '',
      },
      showFormID: -1,
      input: '',
      comments: [],
    };
  },
  methods: {
    load() {
      API.getVideo(this.$route.params.videoID)
        .then((res) => {
          this.video = res.data;
          this.playerOptions.sources[0].src = this.video.url;
        });
      commentAPI.getComments(this.$route.params.videoID)
        .then((res) => {
          this.comments = res.data.items;
        });
    },
    onSubmit() {
      commentAPI.postComment(this.form)
        .then((res) => {
          if (res.status > 0) {
            this.$notify.error({
              title: '评论失败',
              message: res.msg,
            });
          } else {
            this.$notify({
              title: '评论成功',
              message: `您评论的ID为${res.data.id}`,
              type: 'success',
            });
          }
        })
        .catch((error) => {
          this.$notify.error({
            title: '网路错误，或者服务器宕机',
            message: error,
          });
        });
    },
    toggleReplyForm(id) {
      if (this.showFormID === id) {
        this.showFormID = -1;
      } else {
        this.showFormID = id;
      }
    },
    createReply(parentID) {
      this.reply.parent_id = parentID.toString();
      commentAPI.postComment(this.reply)
        .then((res) => {
          if (res.status > 0) {
            this.$notify.error({
              title: '评论失败',
              message: res.msg,
            });
          } else {
            this.$notify({
              title: '评论成功',
              message: `您评论的ID为${res.data.id}`,
              type: 'success',
            });
          }
        })
        .catch((error) => {
          this.$notify.error({
            title: '网路错误，或者服务器宕机',
            message: error,
          });
        });
    },
  },
  components: {
    videoPlayer,
  },
  beforeMount() {
    this.load();
  },
};
</script>

<style>
.video-header {
  margin-bottom: 16px;
}

.video-header h2 {
  margin-bottom: 0px;
  font-size: 18px;
  font-weight: 500;
  color: #212121;
  line-height: 26px;
  height: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-data {
  margin-top: 6px;
  font-size: 12px;
  color: #999;
}

.video-info {
  color: #111;
}

.comment-info {
  font-size: small;
  display: flex;
  align-items: center;
  color: gray;
}

.comment-content {
  font-size: 16px;
  color: #303133;
  line-height: 20px;
  padding: 10px 0;
}

.reply-list {
  border-left: 2px solid;
  margin-left: 30px;
}


</style>
