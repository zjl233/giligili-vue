<template>
  <div class="home">
    <div class="top">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="8" :md="8" v-for="album in albums" :key="album.id">
          <i class="el-icon-folder-opened" @click="goAlbum(album)"></i>
          <br>
          {{album.title}}
        </el-col>
      </el-row>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="6"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from '@/api/album';
import * as UserAPI from '@/api/user';

export default {
  name: 'home',
  data() {
    return {
      albums: [],
      start: 0,
      limit: 6,
      total: 0,
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.start = this.limit * (val - 1); // val 页面
      this.load();
    },
    load() {
      API.getAlbums(this.start, this.limit).then((res) => {
        this.albums = res.data.items;
        this.total = res.data.total;
      });
    },
    goAlbum(album) {
      UserAPI.userMe().then((res) => {
        const currentUser = res.data
        console.log(album)
        if (album.visibility === 'public') {
          this.$router.push({ name: 'showAlbum', params: { albumID: album.id } });
        } else if (album.visibility === 'private' && album.user.id === currentUser.id) {
          this.$router.push({ name: 'showAlbum', params: { albumID: album.id } });
        } else if (album.visibility === 'protect') {
          this.$prompt('请输入相册密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            if (value === album.password) {
              this.$router.push({ name: 'showAlbum', params: { albumID: album.id } });
            } else {
              this.$message({
                type: 'info',
                message: '密码错误'
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        }


      })

      // console.log(album)


    },
  },
  components: {
  },
  beforeMount() {
    this.load();
  },
};
</script>

<style>
.el-icon-folder-opened {
  font-size: 200px;
}


.album-avatar {
  width: 100%;
}
.album-title {
  margin: 4px 0px 4px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.album-bottom {
  margin-top: 4px;
}
.album-info {
  color: #909399;
}
.album-card {
  margin-bottom: 14px;
  cursor: pointer;
}
</style>
