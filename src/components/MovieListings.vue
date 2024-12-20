<script setup>
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import MovieCard from './MovieCard.vue';

const emit = defineEmits(['jsonLoaded']);

const props = defineProps({
    limit: Number,
    showLoadMoreBtn: {
        type: Boolean,
        default: false,
    },
    filter: {
        type: String,
        default: '',
    },
    sortBy: {
        type: String,
        default: '',
    },
});

const state = reactive({
    movies: [],
    isLoading: true,
});

const limitCount = ref(4);

onMounted(async () => {
    try {
        const response = await axios.get('/api/movies');
        state.movies = response.data;

        // If we want to sort by rating.
        if (props.sortBy === 'rating') {
            state.movies.sort((a, b) => b.rating - a.rating);
        }
    } catch (error) {
        console.error('Error fetching movies', error);
    } finally {
        state.isLoading = false;
    }

    emit('jsonLoaded', state.movies.length);
});

// props.filter for filtering
const filteredMovies = computed(() => {
    if (!props.filter || props.filter.trim() === '') {
        return state.movies; // Show all movies, if the filter is empty
    }
    return state.movies.filter((movie) =>
        movie.title && movie.title.toLowerCase().includes(props.filter.toLowerCase())
    );
});

const loadMore = () => {
    limitCount.value += 4;
};
</script>

<template>
    <section class="bg-custom px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 v-if="!showLoadMoreBtn && props.filter.trim().toLowerCase() === ''" class="text-3xl font-bold text-red-400 mb-6 text-center">
                Browse Movies
            </h2>
            <h2 v-else-if="props.filter.trim().toLowerCase() !== ''" class="text-3xl font-bold text-red-400 mb-6 text-center">
                Results ({{ filteredMovies.length }})
            </h2>
            <!-- Show loading spinner while loading is true -->
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader />
            </div>

            <!-- Show filtered movies -->
            <div v-else class="container mx-auto p-6">
                <div class="grid gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                    <MovieCard
                        v-for="movie in filteredMovies.slice(0, showLoadMoreBtn ? limitCount : filteredMovies.length)"
                        :key="movie.id"
                        :movie="movie"
                    />
                </div>
            </div>

            <div class="text-center mt-6">
                <button
                    @click="loadMore"
                    v-if="showLoadMoreBtn && limitCount < 8"
                    class="btn-primary"
                >
                    Load More
                </button>
                <RouterLink v-else-if="showLoadMoreBtn" to="/movies" class="btn-primary">
                    See All
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<style lang="postcss">
    .btn-primary {
    @apply px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-cyan-950 via-slate-500 to-cyan-950 rounded-full shadow-lg hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50;
}

.bg-custom {
    background-image: url('src/assets/img/background.jpg');
    background-size: auto;
    background-position: center;
    background-repeat: repeat;
}
</style>