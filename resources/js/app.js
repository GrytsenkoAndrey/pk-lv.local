require('./bootstrap');

import {createApp, onMounted} from "vue";
// https://github.com/gilbitron/laravel-vue-pagination
import LaravelVuePagination from "laravel-vue-pagination";
import router from './routes/index';
import VueSweetalert2 from "vue-sweetalert2";
import useAuth from "./composables/auth";

const app = createApp({
    setup() {
        const { getUser } = useAuth();
        onMounted(getUser);
    }
});
app.use(router); // app.component we delete because it will be a part of router
app.use(VueSweetalert2);
app.component('Pagination', LaravelVuePagination);
app.mount('#app');
