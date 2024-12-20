<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="bg-gray-900">
      <div class="py-6 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <RouterLink
          to="/movies"
          class="text-gray-200 hover:text-gray-400 flex items-center"
        >
          <i class="pi pi-arrow-circle-left mr-3"></i>Back to Movies
        </RouterLink>
      </div>
    </div>
  </template>

