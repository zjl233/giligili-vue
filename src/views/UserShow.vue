<template>
  <div id="user-show">
    <div class="block"><el-avatar :size="50" :src=user.avatar></el-avatar></div>
    <h2>{{user.nickname}}</h2>
    <div id="user-name">@{{user.user_name}}</div>
  </div>
</template>

<script>
import * as userAPI from '@/api/user';

export default {
  name: 'UserShow',
  data() {
    return {
      user: {},
    };
  },
  methods: {
    load() {
      userAPI.userShow(this.$route.params.user_name)
        .then((res) => {
          this.user = res.data;
        });
    },
  },
  components: {},
  beforeMount() {
    this.load();
  },
};
</script>

<style>
#user-name {
  color: #909399;
}

</style>
