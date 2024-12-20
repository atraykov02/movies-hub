<script setup>
  import logo from '@/components/icons/logo.png';
import { RouterLink, useRoute } from 'vue-router';

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
}
</script>

<template>
    <nav class="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 border-b border-gray-600">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
          <div
            class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            <!-- Logo -->
            <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
              <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
              <span class="hidden md:block text-gray-200 text-2xl font-bold ml-2"
                >Movies Hub</span
              >
            </RouterLink>
            <div class="md:ml-auto">
              <div class="flex space-x-2">
                <RouterLink
                  to="/"
                  :class="[
                    isActiveLink('/') 
                    ? 'bg-gray-700' 
                    : 'hover:bg-gray-600 hover:text-gray-300',
                    'text-gray-200',
                    'px-3',
                    'py-2',
                    'rounded-md']"
                  >Home</RouterLink
                >
                <RouterLink
                  to="/movies"
                  :class="[
                    isActiveLink('/movies') 
                    ? 'bg-gray-700' 
                    : 'hover:bg-gray-600 hover:text-gray-300',
                    'text-gray-200',
                    'px-3',
                    'py-2',
                    'rounded-md']"
                  >Movies</RouterLink
                >
                <RouterLink
                  to="/movies/add"
                  :class="[
                    isActiveLink('/movies/add') 
                    ? 'bg-gray-700' 
                    : 'hover:bg-gray-600 hover:text-gray-300',
                    'text-gray-200',
                    'px-3',
                    'py-2',
                    'rounded-md']"
                  >Add Movie</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
</template>