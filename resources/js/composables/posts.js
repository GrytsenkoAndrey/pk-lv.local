import { ref } from 'vue';
// use<> - default name conversion
export default function usePosts() {
    const posts = ref({});

    const getPosts = async (page = 1) => {
        await axios.get('http://pk-lv.local:8400/api/posts?page=' + page)
            .then(response => {
                posts.value = response.data; // remove .data because of laravel-vue-pagination
            });
    }

    return { posts, getPosts }
}
