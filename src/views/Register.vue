<template>
  <div id="login">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.user_name"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.password_confirm"></el-input>
      </el-form-item>
      <el-form-item label="头像">
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
        <el-button type="primary" @click="onSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as userAPI from '@/api/user';
import * as uploadAPI from '@/api/upload';

export default {
  name: 'Register',
  data() {
    return {
      imageUrl: '',
      form: {
        user_name: '',
        nickname: '',
        password: '',
        password_confirm: '',
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
      // todo refactor the entire upload function
      uploadAPI.postUploadAvatar(option.file.name)
        .then((res) => {
          uploadAPI.putImage(res.data.put, option.file)
            .then(() => {
              this.imageUrl = res.data.get;
              this.form.avatar = res.data.key;
            })
            .catch((error) => {
              this.$notify.error({
                title: '图片上传失败，网络连接中断',
                message: error,
              });
            });
        })
        .catch((error) => {
          this.$notify.error({
            title: '网路错误，或者服务器宕机',
            message: error,
          });
        });
    },
    onSubmit() {
      userAPI.register(this.form)
        .then((res) => {
          if (res.status > 0) {
            this.$notify.error({
              title: '注册失败',
              message: res.msg,
            });
          } else {
            this.$notify({
              title: '注册成功',
              message: `欢迎加入giligili${res.data.nickname}`,
              type: 'success',
            });
            this.$router.push({ name: 'home' });
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
};
</script>

<style scoped>
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
