<template>
  <div class="home">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="类别">
        <el-input v-model="form.category"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>


    </el-form>

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
      total: 0,
      form: {
        title: '',
        category: '',
      },
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.start = this.limit * (val - 1); // val 页面
      this.load();
    },
    load() {
      // API.searchAlbums(this.form.name, this.form.category).then((res) => {
      //   this.albums = res.data.items;
      //   this.total = res.data.total;
      // });
    },
    goAlbum(album) {
      this.$router.push({ name: 'showAlbum', params: { albumID: album.id } });
    },
    onSubmit() {
      API.searchAlbums(this.form.title, this.form.category).then((res) => {
        this.albums = res.data.items;
        this.total = res.data.total;
      });
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
