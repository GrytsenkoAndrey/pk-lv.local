import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
// use<> - default name conversion
export default function usePosts() {
    const posts = ref({});
    const post = ref({});
    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);
    const swal = inject('$swal');

    const getPosts = async (
        page = 1,
        search_category = '',
        search_id = '',
        search_title = '',
        search_content = '',
        search_global = '',
        order_column = 'created_at',
        order_direction = 'desc'
    ) => {
        await axios.get('http://pk-lv.local:8400/api/posts?page=' + page
            + '&search_category=' + search_category
            + '&search_id=' + search_id
            + '&search_title=' + search_title
            + '&search_content=' + search_content
            + '&search_global=' + search_global
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
                swal({
                    icon: 'success',
                    title: 'Post saved successfully'
                });
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
                swal('Post updated!');
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => isLoading.value = false);
    }

    const deletePost = async (id) => {
        swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#ef4444',
            timer: 20000,
            timerProgressBar: true,
            reverseButtons: true
        })
            .then(result => {
                if (result.isConfirmed) {
                    axios.delete('http://pk-lv.local:8400/api/posts/' + id)
                        .then(response => {
                            getPosts();
                            router.push({name: 'posts.index'});
                            swal({
                                icon: 'info',
                                title: 'Post deleted!'
                            });
                        })
                        .catch(error => {
                            swal({
                                icon: 'error',
                                title: 'Something wrong!'
                            })
                        });
                }
            });
    }

    return { posts, post, getPosts, getPost, storePost, updatePost, deletePost, validationErrors, isLoading }
}
