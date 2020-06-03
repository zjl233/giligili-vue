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
      this.$router.push({ name: 'showAlbum', params: { albumID: album.id } });
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
i {
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
