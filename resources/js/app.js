require('./bootstrap');

import { createApp } from "vue";
import App from './layouts/App';
// https://github.com/gilbitron/laravel-vue-pagination
import LaravelVuePagination from "laravel-vue-pagination";
import router from './routes/index';
import VueSweetalert2 from "vue-sweetalert2";

const app = createApp(App);
app.use(router); // app.component we delete because it will be a part of router
app.use(VueSweetalert2);
app.component('Pagination', LaravelVuePagination);
app.mount('#app');
