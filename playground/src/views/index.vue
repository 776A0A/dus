<template>
  <nav class="flex-col fullscreen center-flex">
    <div class="border rounded">
      <h1 class="text-lg mb-4">目录</h1>
      <ul
        class="list-circle text-base children:(transition-all list-none m-0 py-2 px-4 hover-shadow cursor-pointer) "
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
a {
  color: inherit;
}
</style>
