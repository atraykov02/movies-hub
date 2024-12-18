<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const movieId = route.params.id;

const state = reactive({
  movie: {
    title: '',
    year: '',
    genre: '',
    rating: '',
    description: '',
    imageURL: ''
  },
  isSaving: false,
  errorMessage: ''
});

const fetchMovie = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/movies/${movieId}`);
    state.movie = response.data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    state.errorMessage = 'Failed to load movie details.';
  }
};

const saveChanges = async () => {
  state.isSaving = true;
  state.errorMessage = '';
  try {
    await axios.put(`http://localhost:8000/movies/${movieId}`, state.movie);
    router.push(`/movies/${movieId}`);
  } catch (error) {
    console.error('Error saving movie:', error);
    state.errorMessage = 'Failed to save changes. Please try again.';
  } finally {
    state.isSaving = false;
  }
};

fetchMovie();
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-6">
    <div class="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-3xl">
      <h1 class="text-3xl font-bold mb-6 text-center">Edit Movie</h1>

      <div v-if="state.errorMessage" class="text-red-500 mb-4 text-center">{{ state.errorMessage }}</div>

      <form @submit.prevent="saveChanges" class="space-y-4">
        <div>
          <label for="title" class="block text-lg font-semibold">Title</label>
          <input
            id="title"
            v-model="state.movie.title"
            type="text"
            class="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="year" class="block text-lg font-semibold">Year</label>
          <input
            id="year"
            v-model="state.movie.year"
            type="number"
            class="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="genre" class="block text-lg font-semibold">Genre</label>
          <input
            id="genre"
            v-model="state.movie.genre"
            type="text"
            class="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="rating" class="block text-lg font-semibold">Rating</label>
          <input
            id="rating"
            v-model="state.movie.rating"
            type="number"
            step="0.1"
            max="10"
            class="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="description" class="block text-lg font-semibold">Description</label>
          <textarea
            id="description"
            v-model="state.movie.description"
            rows="4"
            class="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label for="imageURL" class="block text-lg font-semibold">Image URL</label>
          <input
            id="imageURL"
            v-model="state.movie.imageURL"
            type="url"
            class="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500"
            @click="router.back()"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="state.isSaving"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
}
</style>