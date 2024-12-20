<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  initialFilter: {
    type: String,
    default: ''
  }
});

const filterName = ref(props.initialFilter);
const emit = defineEmits(['filterChange']);

watch(filterName, (newFilter) => {
  emit('filterChange', newFilter);
});
</script>

<template>
  <div class="mb-6 flex justify-center py-6">
    <div class="w-full max-w-md">
      <label for="movie-filter" class="block mb-3 text-lg font-semibold text-gray-300 tracking-wide text-center">
        Filter by Title:
      </label>
      <div class="relative">
        <input
          id="movie-filter"
          v-model="filterName"
          type="text"
          placeholder="Search for a movie..."
          class="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-sm"
        />
        <svg
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          width="20"
          height="20"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

