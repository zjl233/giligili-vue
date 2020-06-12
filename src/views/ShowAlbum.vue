<template>
  <div class="post-album">
    <h2>{{album.title}}</h2>
          <div class="album-data">
            {{album.created_at | moment('YYYY-MM-DD h:mm:ss') }}创建 ·
            <!--        {{album.view}}观赏-->
          </div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="8" :md="8" v-for="photo in photos" :key="photo.id">
        <el-card class="photo-card">
          <img class="photo-avatar" :src="photo.url">
          <div>
<!--            <div class="photo-title">{{photo.name}}</div>-->
            <div class="photo-bottom clearfix">
<!--              <span class="photo-info">{{photo.name.substring(0, 40)}}</span>-->
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>


</template>

<script>
import * as API from '@/api/album';
import * as UserAPI from '@/api/user';

export default {
  name: 'ShowAlbum',
  data() {
    return {
      album: {},
      photos: [],
      // playerOptions: {
      //   fluid: true,
      //   autoplay: false,
      //   sources: [{
      //     type: 'album/mp4',
      //     src: '',
      //   }],
      // },
      // form: {
      //   album_id: this.$route.params.albumID.toString(),
      //   info: '',
      // },
      // reply: {
      //   album_id: this.$route.params.albumID.toString(),
      //   info: '',
      // },
      // showFormID: -1,
      // input: '',
      // comments: [],
    };
  },
  methods: {
    load() {
      API.getAlbum(this.$route.params.albumID)
        .then((res) => {
          this.album = res.data;
          this.photos = res.data.photos;

          UserAPI.userMe().then((res) => {
            const user = res.data;
            if (user.id !== this.album.user.id) {
              this.$notify.error({
                title: '您不是相册拥有者',
                message: 'error',
              });
              this.$router.push({ name: 'home' })
            }
          });


          // UserAPI.userMe().then((res) => {
          //   const user = res.data
          //
          //   if (user.id !== this.album.user.id) {
          //     this.$notify.error({
          //       title: '您不是改相册的拥有者',
          //       message: error,
          //     })
          //   }

          // this.playerOptions.sources[0].src = this.album.url;
        });
      // commentAPI.getComments(this.$route.params.albumID)
      //   .then((res) => {
      //     this.comments = res.data.items;
      //   });
    },
    // onSubmit() {
    //   commentAPI.postComment(this.form)
    //     .then((res) => {
    //       if (res.status > 0) {
    //         this.$notify.error({
    //           title: '评论失败',
    //           message: res.msg,
    //         });
    //       } else {
    //         this.$notify({
    //           title: '评论成功',
    //           message: `您评论的ID为${res.data.id}`,
    //           type: 'success',
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       this.$notify.error({
    //         title: '网路错误，或者服务器宕机',
    //         message: error,
    //       });
    //     });
    // },
    // toggleReplyForm(id) {
    //   if (this.showFormID === id) {
    //     this.showFormID = -1;
    //   } else {
    //     this.showFormID = id;
    //   }
    // },
    // createReply(parentID) {
    //   this.reply.parent_id = parentID.toString();
    //   commentAPI.postComment(this.reply)
    //     .then((res) => {
    //       if (res.status > 0) {
    //         this.$notify.error({
    //           title: '评论失败',
    //           message: res.msg,
    //         });
    //       } else {
    //         this.$notify({
    //           title: '评论成功',
    //           message: `您评论的ID为${res.data.id}`,
    //           type: 'success',
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       this.$notify.error({
    //         title: '网路错误，或者服务器宕机',
    //         message: error,
    //       });
    //     });
    // },
  },
  components: {
  },
  beforeMount() {
    this.load();
  },
};
</script>

<style>
.album-header {
  margin-bottom: 16px;
}

.album-header h2 {
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

.album-data {
  margin-top: 6px;
  font-size: 12px;
  color: #999;
}

.album-info {
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
