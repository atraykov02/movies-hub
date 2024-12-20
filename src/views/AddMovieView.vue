<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const formData = reactive({
  movie: {
    title: '',
    year: '',
    genre: '',
    rating: '',
    description: '',
    imageURL: ''
  }
});

const handleSubmit = async () => {
  const newMovie = {
    title: formData.movie.title,
    year: formData.movie.year,
    genre: formData.movie.genre,
    rating: formData.movie.rating,
    description: formData.movie.description,
    imageURL: formData.movie.imageURL
  }
  try {
    const response = await axios.post('/api/movies/', newMovie);
    toast.success('Movie added successfully!');
    router.push(`/movies/${response.data.id}`);
  } catch (error) {
    console.error('Error adding movie:', error);
    toast.error('Movie was not added!')
  }
};

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-6">
    <div class="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-3xl">
      <h1 class="text-3xl font-bold mb-6 text-center">Add Movie</h1>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="title" class="block text-lg font-semibold">Title</label>
          <input
            id="title"
            v-model="formData.movie.title"
            type="text"
            class="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="year" class="block text-lg font-semibold">Year</label>
          <input
            id="year"
            v-model="formData.movie.year"
            type="number"
            min="1900"
            max="2025"
            class="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="genre" class="block text-lg font-semibold">Genre</label>
          <select
              id="genre"
              v-model="formData.movie.genre"
              class="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Romance">Romance</option>
              <option value="Documentary">Documentary</option>
              <option value="Animation">Animation</option>
            </select>
        </div>

        <div>
          <label for="rating" class="block text-lg font-semibold">Rating</label>
          <input
            id="rating"
            v-model="formData.movie.rating"
            type="number"
            step="0.1"
            max="5"
            min="1"
            class="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="description" class="block text-lg font-semibold">Description</label>
          <textarea
            id="description"
            v-model="formData.movie.description"
            rows="4"
            class="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label for="imageURL" class="block text-lg font-semibold">Image URL</label>
          <input
            id="imageURL"
            v-model="formData.movie.imageURL"
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
            class="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-900 focus:ring-2 focus:ring-green-500"
          >
            Add Movie
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