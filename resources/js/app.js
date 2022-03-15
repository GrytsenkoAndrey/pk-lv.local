require('./bootstrap');

import { createApp } from "vue";
import App from './layouts/App';
// https://github.com/gilbitron/laravel-vue-pagination
import LaravelVuePagination from "laravel-vue-pagination";
import router from './routes/index';

const app = createApp(App);
app.use(router); // app.component we delete because it will be a part of router
app.component('Pagination', LaravelVuePagination);
app.mount('#app');
