import { ref } from 'vue';
// use<> - default name conversion
export default function useCategories() {
    const categories = ref({});

    const getCategories = async () => {
        await axios.get('http://pk-lv.local:8400/api/categories')
            .then(response => {
                categories.value = response.data.data;
            });
    }

    return { categories, getCategories }
}
