import { ref } from 'vue';
// use<> - default name conversion
export default function usePosts() {
    const posts = ref([]);

    const getPosts = async () => {
        axios.get('http://pk-lv.local:8400/api/posts')
            .then(response => {
                posts.value = response.data;
            });
    }

    return { posts, getPosts }
}
