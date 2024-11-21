<script setup>
import movieData from '@/movies.json';
import { ref } from 'vue';
import MovieCard from './MovieCard.vue';

const movies = ref(movieData);

</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-blue-500 mb-6 text-center">
                Browse Movies
            </h2>
            <div class="container mx-auto p-6">
                <div class="grid gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                    <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
                </div>
            </div>
        </div>
    </section>

    
</template>