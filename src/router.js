import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

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
    {
      path: '/user/:user_name',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ './views/UserShow.vue'),
    },

  ],
});
