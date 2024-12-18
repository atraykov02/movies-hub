<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const route = useRoute();

const movieId = route.params.id;

const state = reactive({
  movie: {},
  isLoading: true
});

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8000/movies/${movieId}`);
    state.movie = response.data;
  } catch (error) {
    console.error('Error fetching movie', error);
  } finally {
    state.isLoading = false;
  }
});

const deleteMovie = async () => {
  if (confirm('Are you sure you want to delete this movie?')) {
    try {
      await axios.delete(`http://localhost:8000/movies/${movieId}`);
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting movie', error);
    }
  }
};
</script>

<template>
  <div class="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
    <div v-if="state.isLoading" class="flex justify-center items-center h-full">
      <PulseLoader color="#2563eb" size="15px" />
    </div>

    <div v-else class="relative h-full w-full">
      <!-- Background image -->
      <div
        class="absolute inset-0 bg-cover bg-center opacity-30"
        :style="{ backgroundImage: `url(${state.movie.imageURL})` }"
      ></div>

      <!-- Content overlay -->
      <div class="relative z-10 flex flex-col h-full items-center justify-center text-center px-6">
        <div class="bg-black bg-opacity-60 p-8 rounded-lg max-w-3xl">
          <h1 class="text-5xl font-extrabold mb-4">{{ state.movie.title }}</h1>
          <p class="text-xl mb-2"><span class="font-semibold">Year:</span> {{ state.movie.year }}</p>
          <p class="text-xl mb-2"><span class="font-semibold">Genre:</span> {{ state.movie.genre }}</p>
          <p class="text-xl mb-2"><span class="font-semibold">Rating:</span> {{ state.movie.rating }}</p>
          <p class="mt-4 text-lg leading-relaxed">{{ state.movie.description }}</p>

          <div class="mt-6 flex justify-center space-x-6">
            <button
              class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-lg shadow-md transition duration-300"
              @click="deleteMovie"
            >
              Delete
            </button>
            <RouterLink
              :to="`/movies/edit/${movieId}`"
              class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg shadow-md transition duration-300"
            >
              Edit
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  height: 100%;
}
</style>
