import { ref } from 'vue';
// use<> - default name conversion
export default function usePosts() {
    const posts = ref({});

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

    return { posts, getPosts }
}
