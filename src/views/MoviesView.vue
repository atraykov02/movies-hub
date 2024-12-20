<script setup>
import MovieListings from '@/components/MovieListings.vue';
import MoviesFilter from '@/components/MoviesFilter.vue';
import { ref } from 'vue';

const filterText = ref('');

const handleFilterChange = (filter) => {
  filterText.value = filter.toLowerCase();
};
</script>

<template>
  <div>
    <MoviesFilter @filterChange="handleFilterChange" />
    <MovieListings :filter="filterText" />
  </div>
</template>
