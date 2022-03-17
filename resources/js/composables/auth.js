import { ref, reactive } from 'vue';
import { useRouter } from "vue-router";
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
        localStorage.setItem('loggedIn', JSON.stringify(true));
        router.push({ name: 'posts.index' });
    }

    return { submitLogin, loginForm, processing, validationErrors }
}
