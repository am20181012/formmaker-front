<template>
    <!--Title of The Page-->
    <header class="border-2 border-purple-500">
        <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold from-purple-500 to-indigo-700 bg-gradient-to-r bg-clip-text text-transparent">{{ title }}</h1>
          <slot name="header"></slot>
        </div>
      </header>
      <main class="bg-white overflow-y-auto h-screen">
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <!-- Content -->
          <div class="px-2 py-6 sm:px-0">
            <slot></slot>
            <!-- <div class="h-96 rounded-lg border-4 border-dashed border-gray-200" /> -->
          </div>
        </div>
      </main>
</template>

<script setup>
    
    const props = defineProps({
        title: String
    });

</script>

<style>

</style>