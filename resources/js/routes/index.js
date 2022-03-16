import { createRouter, createWebHistory } from 'vue-router';
import PostsIndex from "../components/Posts/Index";
import PostsCreate from "../components/Posts/Create";
import PostsEdit from "../components/Posts/Edit";

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
    },
    {
        path: '/posts/edit/:id',
        component: PostsEdit,
        name:  'posts.edit',
        meta: { title: 'Edit post'}
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});
