<template>
  <main class="flex h-screen items-center justify-center">
    <div
      @click="sliderIns?.slideRight()"
      class="cursor-pointer rounded-full mr-4 hover-shadow center-flex"
    >
      <i class="i-ic:round-chevron-left w-10 h-10"></i>
    </div>
    <div>
      <Slider
        ref="sliderIns"
        class="h-100 shadow text-shadow-xl w-300 select-none"
        :list="images"
        :scale="0.8"
        autoplay
        @activeChange="active = $event"
      >
        <template #default="{ data }">
          <img :src="data" alt="slider-image" class="object-contain full" />
        </template>
      </Slider>
      <div>
        <ul
          class="space-x-4 mt-4 center-flex children:(w-1.5 h-1.5 bg-black rounded-full transform scale-100 transition-all duration-300 ease-out)"
        >
          <li
            v-for="(_, i) in images"
            :class="[i === active ? '!scale-125 !w-5 !rounded-xl' : '']"
          ></li>
        </ul>
      </div>
    </div>
    <div
      @click="sliderIns?.slideLeft()"
      class="cursor-pointer rounded-full ml-4 hover-shadow center-flex"
    >
      <i class="i-ic:round-chevron-right w-10 h-10"></i>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { Slider } from '@dus/slider'
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
const active = ref(0)
</script>

<style scoped></style>
