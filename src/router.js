import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ListUserAlbums from './views/ListUserAlbums.vue';
import ShowAlbum from './views/ShowAlbum.vue';
import PostAlbum from '@/views/PostAlbum';
import SearchAlbums from '@/views/SearchAlbums';
import DeletePhotos from '@/views/DeletePhotos';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/postvideo',
      name: 'postVideo',
      component: () => import(/* webpackChunkName: "video" */ './views/PostVideo.vue'),
    },
    {
      path: '/video/:videoID',
      name: 'showVideo',
      component: () => import(/* webpackChunkName: "video" */ './views/ShowVideo.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
    // {
    //   path: '/user/:user_name',
    //   name: 'user',
    //   component: () => import(/* webpackChunkName: "user" */ './views/UserShow.vue'),
    // },

    {
      path: '/user/albums',
      name: 'userAlbums',
      component: ListUserAlbums,
    },

    {
      path: '/album/:albumID',
      name: 'showAlbum',
      component: ShowAlbum,
    },
    {
      path: '/postalbum',
      name: 'postAlbum',
      component: PostAlbum,
    },
    {
      path: '/searchalbums',
      name: 'searchAlbums',
      component: SearchAlbums,
    },
    {
      path: '/deletephotos',
      name: 'deletePhotos',
      component: DeletePhotos,
    },

  ],
});
