<template>
  <div class="post-video">
    <h2>欢迎投稿：</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <!--      <el-form-item label="视频地址">-->
      <!--        <el-input type="url" v-model="form.url"></el-input>-->
      <!--      </el-form-item>-->

      <el-form-item label="视频">
        <el-upload class="video-uploader" action="" :before-upload="BeforeVideoUpload"
                   :http-request="UploadVideoRequest" multiple
                   :limit="1" :on-exceed="handleExceed">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传MP4文件，且请您自行压缩</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.info"></el-input>
      </el-form-item>

      <el-form-item label="视频封面">
        <el-upload
          class="avatar-uploader"
          label="描述"
          action=""
          ref="upload"
          :before-upload="beforeAvatarUpload"
          :http-request="fnUploadAvatarRequest"
          :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">只能上传png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import * as API from '@/api/video';
import * as uploadAPI from '@/api/upload';

export default {
  name: 'PostVideo',
  data() {
    return {
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        title: '',
        info: '',
        url: '',
        avatar: '',
      },
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      const isImage = (file.type === 'image/png' || file.type === 'image/jpeg');
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error('上传头像图片只能是图片!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isImage && isLt2M;
    },
    fnUploadAvatarRequest(option) {
      uploadAPI.postUploadAvatar(option.file.name)
        .then((res) => {
          const oReq = new XMLHttpRequest();
          oReq.open('PUT', res.data.put, true);
          oReq.send(option.file);
          oReq.onload = () => {
            this.imageUrl = res.data.get;
            this.form.avatar = res.data.key;
          };
        })
        .catch((error) => {
          this.$notify.error({
            title: '网路错误，或者服务器宕机',
            message: error,
          });
        });
    },
    BeforeVideoUpload(file) {
      const isMP4 = file.type === 'video/mp4';
      if (!isMP4) {
        this.$message.error('上传视频只能是 mp4 格式!');
      }
      return isMP4;
    },
    customColorMethod(percentage) {
      if (percentage < 50) {
        return '#909399';
      }
      if (percentage < 100) {
        return '#e6a23c';
      }
      return '#67c23a';
    },
    handleExceed() {
      this.$message.warning('仅可上传一个视频');
    },
    UploadVideoRequest(option) {
      uploadAPI.postUploadVideo(option.file.name)
        .then((res) => {
          const oReq = new XMLHttpRequest();
          // 获取上传进度
          oReq.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              this.percentage = Math.floor(event.loaded / event.total * 100);
              // 设置进度显示
              console.log(this.percentage);
            }
          };
          oReq.open('PUT', res.data.put, true);
          oReq.send(option.file);
          oReq.onload = () => {
            this.form.url = res.data.key;
            this.$notify({
              title: '视频上传成功',
              message: 'success',
              type: 'success',
            });
          };
        })
        .catch((error) => {
          this.$notify.error({
            title: '网路错误，或者服务器宕机',
            message: error,
          });
        });
    },
    onSubmit() {
      API.postVideo(this.form)
        .then((res) => {
          if (res.status > 0) {
            this.$notify.error({
              title: '投稿失败',
              message: res.msg,
            });
          } else {
            this.$notify({
              title: '投稿成功',
              message: `您投稿的ID为${res.data.id}`,
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
  components: {},
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  max-width: 178px;
  max-height: 178px;
  display: block;
}
</style>
