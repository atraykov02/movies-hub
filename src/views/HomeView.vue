<script setup>
import MovieListings from '@/components/MovieListings.vue';
import Title from '@/components/Title.vue';
import { ref } from 'vue';

const movCount = ref(0);
const limitCount = ref(4);

const updateMovieCount = (movieCount) => {
  movCount.value = movieCount;
};
</script>

<template>
  <div class="py-10">
    <Title title="★ ★ ★ Highest Rated Movies ★ ★ ★" />
    <MovieListings @jsonLoaded="updateMovieCount" :limit="limitCount" :sortBy=" 'rating' " showLoadMoreBtn="true" />
  </div>
</template>
