<template>
  <div
    ref="sliderContainerEl"
    class="flex relative overflow-hidden slider-container"
    @mouseover="pause"
    @mouseleave="autoplay && run()"
  >
    <div v-for="item in activeImages" class="slider-item will-change-transform">
      <slot :data="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from 'vue'
import { useEventListener } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    list?: string[]
    scale?: number
    duration?: number
    autoplay?: boolean
    toRight?: boolean
  }>(),
  { list: () => [], scale: 0.8, duration: 1000, autoplay: false }
)
const DURATION = props.duration
const sliderContainerEl = ref<HTMLDivElement>()
const active = ref(1)
const sliderItemEls = reactive<HTMLDivElement[]>([])
const activeImages = ref<string[]>([])
let timer: NodeJS.Timer
let sliding = false

useEventListener(document, 'visibilitychange', () => {
  if (document.visibilityState === 'hidden') clearTimeout(timer)
  else if (props.autoplay) run()
})

onMounted(async () => {
  if (!props.list.length) return

  await init()

  if (props.autoplay) run()
})

defineExpose({ slideLeft, slideRight })

async function init() {
  fillActives()

  await nextTick()

  getSliderItemEls()
  reset()
}

function pause() {
  clearTimeout(timer)
}

function fillActives() {
  const images = props.list,
    length = images.length

  const tmp: string[] = []

  while (tmp.length < 5) tmp.push(...images)

  tmp.unshift(images[length - 1])

  tmp.splice(5)

  activeImages.value = tmp.slice(0, 5)

  if (length === 1) active.value = 0
}

function getSliderItemEls() {
  if (!sliderContainerEl.value) return

  sliderItemEls.push(
    ...(Array.from(
      sliderContainerEl.value.querySelectorAll(':scope > .slider-item')
    ) as HTMLDivElement[])
  )
}

function teleport() {
  sliderContainerEl.value?.removeEventListener('transitionend', teleport)

  const tmp: string[] = []

  const _active = (props.list.length + active.value) % props.list.length

  tmp[0] = props.list[_active]
  tmp[1] =
    props.list[(props.list.length + active.value + 1) % props.list.length]
  tmp[2] =
    props.list[(props.list.length + active.value + 2) % props.list.length]

  tmp.unshift(
    props.list[(props.list.length + active.value - 1) % props.list.length]
  )
  tmp.unshift(
    props.list[(props.list.length + active.value - 2) % props.list.length]
  )

  activeImages.value = tmp.slice(0, 5)

  reset()

  setTimeout(() => {
    sliding = false
    if (props.autoplay) run()
  })
}

function run() {
  clearTimeout(timer)

  timer = setTimeout(
    () => (props.toRight ? slide('right') : slide('left')),
    DURATION
  )
}

function slide(direction: 'left' | 'right') {
  if (sliding) return

  sliding = true

  clearTimeout(timer)

  sliderContainerEl.value?.addEventListener('transitionend', teleport)

  active.value = active.value + (direction === 'left' ? 1 : -1)
  if (active.value < 0) active.value = props.list.length - 1

  sliderItemEls.forEach((el, i) => {
    transition(el, `all 300ms ease-out`)
    transform(
      el,
      +getTranslateX(el) + (direction === 'left' ? -100 : 100),
      direction === 'left' ? (i === 3 ? 1 : 0.8) : i === 1 ? 1 : 0.8
    )
  })
}

function slideLeft() {
  slide('left')
}

function slideRight() {
  slide('right')
}

function getTranslateX(el: HTMLElement) {
  return (
    el.style.transform.match(/translate3d\((.+)%,\s*.+,\s*.+\)/)?.[1] ?? '0'
  )
}

function transform(el: HTMLElement, x: number, scale: number) {
  el.style.transform = `translate3d(${x}%, 0, 0) scale(${scale})`
}

function reset() {
  sliderItemEls.forEach((image) => transition(image, 'none'))
  sliderItemEls.forEach((image, i) =>
    transform(image, 100 * (i - 1), i === 2 ? 1 : 0.8)
  )
}

function transition(el: HTMLElement, transition: string) {
  el.style.transition = transition
}
</script>

<style scoped>
.slider-container {
  @apply children:(h-full flex-shrink-0 top-0 left-0 w-1/3 absolute center-flex);
}
</style>
