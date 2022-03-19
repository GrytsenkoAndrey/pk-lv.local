import {ref, reactive, inject} from 'vue';
import { useRouter } from "vue-router";

const user = reactive({
    name: '',
    email: ''
});
// use<> - default name conversion
export default function useAuth() {
    const router = useRouter();
    const loginForm = reactive({
        email: '',
        password: '',
        remember: false
    });
    const processing = ref(false);
    const validationErrors = ref({});
    const swal = inject('$swal');

    const submitLogin = async () => {
        if (processing.value) return;

        processing.value = true;
        validationErrors.value = {};

        axios.post('http://pk-lv.local:8400/login', loginForm)
            .then(async response => {
                loginUser(response);
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => processing.value = false);
    }

    const loginUser = (response) => {
        user.name = response.data.name;
        user.email = response.data.email;
        localStorage.setItem('loggedIn', JSON.stringify(true));
        router.push({ name: 'posts.index' });
    }

    const getUser = () => {
        axios.get('http://pk-lv.local:8400/api/user').then(response => {loginUser(response)});
    }

    const logout = async () => {
        if (processing.value) return

        processing.value = true

        axios.post('http://pk-lv.local:8400/logout')
            .then(response => router.push({ name: 'login' }))
            .catch(error => {
                swal({
                    icon: 'error',
                    title: error.response.status,
                    text: error.response.statusText
                })
            })
            .finally(() => {
                processing.value = false
            })
    }

    return { submitLogin, loginForm, processing, validationErrors, user, getUser, logout }
}
