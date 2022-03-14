<template>
    <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
        <div class="min-w-full align-middle">
            <table class="min-w-full divide-y divide-gray-200 border">
                <thead>
                <tr>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Title</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Content</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Created at</span>
                    </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                <tr v-for="post in posts" :key="post.id">
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.id }}</td>
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.title }}</td>
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.content }}</td>
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{ post.created_at }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
/**
 * Vue3 composition has 2 part
 * 1 - composable it's like a service class in Laravel; set of method and variables (like include)
 * 2 - use in the component Vue it's make it shorter
 */
import { onMounted } from "vue";
import usePosts from "../../composables/posts";

export default {
    setup () {
        const { posts, getPosts } = usePosts();
        onMounted(getPosts);

        return { posts }
    }
}
</script>
