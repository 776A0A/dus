<template>
  <main class="flex h-screen items-center justify-center">
    <div
      @click="sliderIns?.slideRight()"
      class="cursor-pointer rounded-1 mr-4 hover-shadow center-flex"
    >
      <IcRoundChevronLeft class="h-10 w-10" />
    </div>
    <Slider
      ref="sliderIns"
      class="h-100 shadow text-shadow-xl w-300 select-none"
      :list="images"
      :scale="0.8"
    >
      <template #default="{ data }">
        <img :src="data" alt="slider-image" class="object-contain full" />
      </template>
    </Slider>
    <div
      @click="sliderIns?.slideLeft()"
      class="cursor-pointer rounded-1 ml-4 hover-shadow center-flex"
    >
      <IcRoundChevronRight class="h-10 w-10" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { Slider } from '@dz7/slider'
import slider1 from './assets/slider-1.png'
import slider2 from './assets/slider-2.png'
import slider3 from './assets/slider-3.png'
import slider4 from './assets/slider-4.png'
import { ref } from 'vue'

const images = [
  slider1,
  slider2,
  slider3,
  slider4,
  'https://tse2-mm.cn.bing.net/th/id/OIP-C.x2hDmrrJo9MzktqX2csZkQHaLh?w=200&h=311&c=7&r=0&o=5&pid=1.7',
  'https://tse3-mm.cn.bing.net/th/id/OIP-C.LPuuOraDuRoHCA-RStAmggHaHa?w=204&h=204&c=7&r=0&o=5&pid=1.7',
]
const sliderIns = ref<{ slideLeft: VoidFunction; slideRight: VoidFunction }>()
</script>

<style scoped>
:deep(.slider-item__active) {
  @apply bg-black;
}
</style>
