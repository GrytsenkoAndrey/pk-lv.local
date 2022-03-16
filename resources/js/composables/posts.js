import { ref } from 'vue';
import { useRouter } from 'vue-router';
// use<> - default name conversion
export default function usePosts() {
    const posts = ref({});
    const post = ref({});
    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);

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
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();
        for (let item in post) {
            if (post.hasOwnProperty(item)) {
                serializedPost.append(item, post[item]);
            }
        }

        await axios.post('http://pk-lv.local:8400/api/posts', serializedPost)
            .then(response => {
                router.push({name: 'posts.index'});
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => isLoading.value = false);
    }

    const getPost = async (id) => {
        await axios.get('http://pk-lv.local:8400/api/posts/' + id)
            .then(response => {
                post.value = response.data.data;
            });
    }

    const updatePost = async (post) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        await axios.patch('http://pk-lv.local:8400/api/posts/' + post.id, post)
            .then(response => {
                router.push({name: 'posts.index'});
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => isLoading.value = false);
    }

    return { posts, post, getPosts, getPost, storePost, updatePost, validationErrors, isLoading }
}
