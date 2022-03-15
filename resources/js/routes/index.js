import { createRouter, createWebHistory } from 'vue-router';
import PostsIndex from "../components/Posts/Index";
import PostsCreate from "../components/Posts/Create";

const routes = [
    {
        path: '/',
        component: PostsIndex,
        name: 'posts.index',
        meta: { title: 'Posts'}
    },
    {
        path: '/posts/create',
        component: PostsCreate,
        name:  'posts.create',
        meta: { title: 'Add new post'}
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});
