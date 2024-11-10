<script setup>
    import { defineProps } from 'vue';

defineProps({
    title: {
        type: String,
        default: "Movies Hub"
    }
});
</script>

<template>
    <section class="bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-200">
      <div
        class="max-w-7xl mx-auto px-4 py-9 sm:px-6 lg:px-8 flex flex-col items-center"
      >
        <div class="text-center">
          <h1
            class="text-4xl font-extrabold text-slate-500 sm:text-4xl md:text-4xl"
          >
            {{title}}
          </h1>
        </div>
      </div>
    </section>
</template>