<template>
  <nav class="flex-col fullscreen center-flex">
    <div class="bg-white border rounded border-main">
      <h1 class="border-b text-lg py-2 px-4 border-main">目录</h1>
      <ul
        class="list-circle text-base children:(transition-all list-none m-0 py-2 px-4 hover-shadow cursor-pointer)"
      >
        <li>
          <span class="mr-2">🤨</span>
          <RouterLink to="/slider">轮播图</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
nav {
  background-image: url('assets/pexels-skyler-ewing-4793432.jpg');
  @apply bg-no-repeat bg-cover bg-center;
}
a {
  color: inherit;
}
</style>
