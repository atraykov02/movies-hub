<script setup>
import MovieCard from '@/components/MovieCard.vue';
import Title from '@/components/Title.vue';
import { ref } from 'vue';

const allCards = Array.from({ length: 24 }, (_, i) => i + 1);
const displayedCards = ref(allCards.slice(0, 8));


const loadMore = () => {
  const nextBatch = allCards.slice(displayedCards.value.length, displayedCards.value.length + 8);
  displayedCards.value = [...displayedCards.value, ...nextBatch];
};

const viewAllMovies = () => {
    //SHTE OTIVA NA MOVIES STRANICATA.
}

</script>

<template>
    <div class="bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-200">
      <Title title="Highest Rated Movies"/>
      <div class="container mx-auto p-6">
        <div class="grid gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          <MovieCard
            v-for="(index, idx) in displayedCards"
            :key="idx"
          />
        </div>
  
        <div class="text-center mt-6">
          <button
            @click="loadMore"
            v-if="displayedCards.length <= 8"
            class="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-full shadow-lg hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Зареди още
          </button>
          <button
            @click="viewAllMovies"
            v-else
            class="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-full shadow-lg hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Виж всички филми
          </button>
        </div>
      </div>
    </div>
  </template>