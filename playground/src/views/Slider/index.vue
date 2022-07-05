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
      class="h-100 w-300 select-none"
      :images="images"
      :scale="0.8"
    />
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

const images = [slider1, slider2, slider3, slider4]
const sliderIns = ref<{ slideLeft: VoidFunction; slideRight: VoidFunction }>()
</script>

<style scoped></style>
