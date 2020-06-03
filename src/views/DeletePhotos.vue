<template>
  <div class="post-album">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="8" :md="8" v-for="photo in photos" :key="photo.id">
        <el-card class="photo-card" @click.native="onDelete(photo.id)">
          <img class="photo-avatar" :src="photo.url">
          <div>
            <div class="photo-title">{{photo.name}}</div>
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
import * as API from '@/api/photo';

export default {
  name: 'DeletePhotos',
  data() {
    return {
      photos: [],
    };
  },
  methods: {
    load() {
      API.getPhotos(this.$route.params.albumID)
        .then((res) => {
          this.photos = res.data.items;
        });
    },

    onDelete(id) {
      this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认删除',
        cancelButtonText: '放弃删除',
      })
        .then(() => {
          API.deletePhoto(id);
          this.$message({
            type: 'info',
            message: `删除图片的ID为${id}`,
          });
        })
        .catch((action) => {
          this.$message({
            type: 'info',
            message: action === 'cancel'
              ? '放弃本次删除操作'
              : '停留在当前页面',
          });
        });
    },
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
