<template>
  <div id="login">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.user_name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as userAPI from '@/api/user';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_name: '',
        password: '',
      },
    };
  },
  methods: {
    onSubmit() {
      userAPI.login(this.form)
        .then((res) => {
          if (res.status > 0) {
            this.$notify.error({
              title: '登陆失败',
              message: res.msg,
            });
          } else {
            this.$notify({
              title: '登陆成功',
              message: `欢迎回来${res.data.nickname}🥰🥰🥰`,
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

</style>
