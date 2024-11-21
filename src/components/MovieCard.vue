<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

defineProps({
    movie: {
        type: Object,
        required: true
    }
});

function getStars(rating) {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    
    return {
        fullStars,
        emptyStars
    };
}
</script>

<template>
    <div class="max-w-md bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
        <!-- Изображение на филма -->
        <img class="w-full h-64 object-cover" :src="movie.imageURL" :alt="movie.title">

        <div class="p-6">
            <!-- Заглавие на филма -->
            <h2 class="text-2xl font-semibold text-gray-800">{{ movie.title }}</h2>

            <!-- Жанр -->
            <p class="text-gray-500 text-sm mb-4">
                Жанр: <span class="font-semibold">{{ movie.genre }}</span>
            </p>

            <!-- Лейбъл за годината на издаване -->
            <p class="text-gray-500 text-sm mb-4">
                Година на издаване: <span class="font-semibold">{{ movie.year }}</span>
            </p>

            <!-- Рейтинг със звездички -->
            <p class="text-gray-500 text-sm mb-4">
                Рейтинг:
                <span class="flex items-center">
                    <!-- Пълни звезди -->
                    <span v-for="n in getStars(movie.rating).fullStars" :key="'full-' + n" class="text-yellow-400">★</span>
                    <!-- Празни звезди -->
                    <span v-for="n in getStars(movie.rating).emptyStars" :key="'empty-' + n" class="text-gray-300">★</span>
                    <!-- Цифрова стойност -->
                    <span class="ml-2 text-gray-600">({{ movie.rating }})</span>
                </span>
            </p>

            <!-- Бутон "Виж още" -->
            <RouterLink
                :to="'/movie/' + movie.id"
                class="w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-lg hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                Виж още
            </RouterLink>
        </div>
    </div>
</template>