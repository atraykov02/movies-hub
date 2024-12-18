<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import MovieCard from './MovieCard.vue';
const emit = defineEmits(['jsonLoaded']);

const state = reactive({
    movies: [],
    isLoading: true
});

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
  try {
    const response = await axios.get('http://localhost:8000/movies');
    state.movies = response.data;
  } catch (error) {
    console.error('Error fetching movies', error);
  } finally {
    state.isLoading = false;
  }

  emit('jsonLoaded', state.movies.length);
});
const loadMore = () => {
  limitCount.value += 4;
};
</script>

<template>
    <section class="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 v-if="!showLoadMoreBtn" class="text-3xl font-bold text-blue-500 mb-6 text-center">
                Browse Movies
            </h2>

            <!-- Show loading spinner while loading is true -->
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader />
            </div>

            <!-- Show movies when done loading-->

            <div v-else class="container mx-auto p-6">
                <div class="grid gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                    <MovieCard v-for="movie in state.movies.slice(0, showLoadMoreBtn ? limitCount : state.movies.length)" :key="movie.id" :movie="movie" />
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