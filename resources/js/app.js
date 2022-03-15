require('./bootstrap');

import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router';
import App from './layouts/App';
import PostsIndex from './components/Posts/Index';
import PostsCreate from './components/Posts/Create';
// https://github.com/gilbitron/laravel-vue-pagination
import LaravelVuePagination from "laravel-vue-pagination";

const routes = [
    { path: '/', component: PostsIndex },
    { path: '/posts/create', component: PostsCreate }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.use(router); // app.component we delete because it will be a part of router
app.component('Pagination', LaravelVuePagination);
app.mount('#app');
