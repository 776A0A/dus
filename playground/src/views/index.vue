<template>
  <nav class="fullscreen center-flex">
    <ul
      class="border rounded list-circle text-base children:(transition-all ml-8 pl-0 p-2 cursor-pointer) "
    >
      <li class="hover-shadow">
        <RouterLink to="/slider">轮播图</RouterLink>
      </li>
    </ul>
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
