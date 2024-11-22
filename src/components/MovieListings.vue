<script setup>
import movieData from '@/movies.json';
import { onMounted, ref } from 'vue';
import MovieCard from './MovieCard.vue';
const emit = defineEmits(['jsonLoaded']);

const movies = ref(movieData);
const limitCount = ref(4);
defineProps({
    limit: Number,
    showLoadMoreBtn: {
        type: Boolean,
        default: false,
  },
});

onMounted (async () => {
// const response  =  await getJson();
  emit('jsonLoaded', movies.value.length);
});
const loadMore = () => {
  limitCount.value += 4;
};
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-blue-500 mb-6 text-center">
                Browse Movies
            </h2>
            <div class="container mx-auto p-6">
                <div class="grid gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                    <MovieCard v-for="movie in movies.slice(0, showLoadMoreBtn ? limitCount : movies.length)" :key="movie.id" :movie="movie" />
                </div>
            </div>

            <div class="text-center mt-6">
                <button
                    @click="loadMore"
                    v-if="showLoadMoreBtn && limitCount < 8"
                    class="btn-primary"
                >
                    Зареди още
                </button>
                <RouterLink
                    v-else-if="showLoadMoreBtn"
                    to="/movies"
                    class="btn-primary"
                >
                    Виж всички филми
                </RouterLink>
            </div>
        </div>
    </section>

    
</template>

<style lang="postcss">
    .btn-primary {
    @apply px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-full shadow-lg hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50;
}
</style>