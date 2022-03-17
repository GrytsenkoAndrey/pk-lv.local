import { createRouter, createWebHistory } from 'vue-router';
import AuthenticatedLayout from "../layouts/Authenticated";
import GuestLayout from "../layouts/Guest";
import PostsIndex from "../components/Posts/Index";
import PostsCreate from "../components/Posts/Create";
import PostsEdit from "../components/Posts/Edit";
import Login from "../components/Login";

const routes = [
    {
        component: GuestLayout,
        children: [
            {
                path: '/login',
                component: Login,
                name: 'login'
            }
        ]
    },
    {
        component: AuthenticatedLayout,
        children: [
            {
                path: '/posts',
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
        ]
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});
