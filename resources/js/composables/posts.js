import { ref } from 'vue';
import { useRouter } from 'vue-router';
// use<> - default name conversion
export default function usePosts() {
    const posts = ref({});
    const router = useRouter();
    const validationErrors = ref({});

    const getPosts = async (
        page = 1,
        category = '',
        order_column = 'created_at',
        order_direction = 'desc'
    ) => {
        await axios.get('http://pk-lv.local:8400/api/posts?page=' + page
            + '&category=' + category
            + '&order_column=' + order_column
            + '&order_direction=' + order_direction
        )
            .then(response => {
                posts.value = response.data; // remove .data because of laravel-vue-pagination
            });
    }

    const storePost = async (post) => {
        await axios.post('http://pk-lv.local:8400/api/posts', post)
            .then(response => {
                router.push({name: 'posts.index'});
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            });
    }

    return { posts, getPosts, storePost, validationErrors }
}
