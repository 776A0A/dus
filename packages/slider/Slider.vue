<template>
  <div
    ref="sliderContainerEl"
    class="flex relative overflow-hidden slider-container children:(w-1/3 h-full flex-shrink-0 absolute top-0 left-0 center-flex )"
  >
    <div v-for="item in activeImages" class="slider-item will-change-transform">
      <img
        :src="item"
        alt="slider-image"
        class="object-contain full slider-image"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{
    images?: string[]
    scale?: number
    duration?: number
  }>(),
  { images: () => [], scale: 0.8, duration: 1000 }
)
const DURATION = props.duration
const SCALE_REDUCE = `scale(${props.scale})`
const sliderContainerEl = ref<HTMLDivElement>()
const active = ref(1)
const sliderItemEls = reactive<HTMLDivElement[]>([])
const activeImages = reactive<string[]>([])

onMounted(async () => {
  if (!props.images.length) return

  fill()
  await nextTick()
  getEls()
  reset()
  slide()
})

function fill() {
  activeImages.push(...props.images.slice(0, 4))

  if (activeImages.length < 4) {
    const images = [...activeImages]

    Array.from({ length: 3 }, () => 0).forEach(() =>
      activeImages.push(...images)
    )
  }

  activeImages.splice(4)
}

function getEls() {
  if (!sliderContainerEl.value) return

  sliderItemEls.push(
    ...(Array.from(
      sliderContainerEl.value.querySelectorAll(':scope > .slider-item')
    ) as HTMLDivElement[])
  )
}

function teleport() {
  window.removeEventListener('transitionend', teleport)

  activeImages.shift()

  const last = props.images[(active.value + 2) % props.images.length]

  activeImages.push(last)

  reset()

  setTimeout(slide)
}

function slide() {
  setTimeout(() => {
    window.addEventListener('transitionend', teleport)
    active.value++

    sliderItemEls.forEach((el, i) => {
      transition(el, `all 300ms ease-out`)
      transform(el, +getTranslateX(el) - 100, i)
    })
  }, DURATION)
}

function getTranslateX(el: HTMLElement) {
  return (
    el.style.transform.match(/translate3d\((.+)%,\s*.+,\s*.+\)/)?.[1] ?? '0'
  )
}

function transform(el: HTMLElement, x: number, index: number, reset = false) {
  el.style.transform = `translate3d(${x}%, 0, 0) ${
    reset ? (index !== 1 ? SCALE_REDUCE : '') : index === 2 ? '' : SCALE_REDUCE
  }`
}

function reset() {
  sliderItemEls.forEach((image) => transition(image, 'none'))
  sliderItemEls.forEach((image, i) => transform(image, 100 * i, i, true))
}

function transition(el: HTMLElement, transition: string) {
  el.style.transition = transition
}
</script>

<style scoped></style>
