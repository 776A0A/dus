import { asyncMount, fast } from '@dz7/test-utils'
import { array } from '@dz7/tools'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import Slider from '../Slider.vue'
import { getTranslateX } from '../utils'

describe('Slider', () => {
  it('渲染正确', async () => {
    const { wrapper } = await factory({ list: generate(5) })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll('.slider-item')).toHaveLength(5)
  })

  it.each([
    [1, generate(1), array(5, () => 'a1')],
    [2, generate(2), ['a2', 'a1', 'a2', 'a1', 'a2']],
    [3, generate(3), ['a3', 'a1', 'a2', 'a3', 'a1']],
    [4, generate(4), ['a4', 'a1', 'a2', 'a3', 'a4']],
    [5, generate(5), ['a5', 'a1', 'a2', 'a3', 'a4']],
    [6, generate(6), ['a6', 'a1', 'a2', 'a3', 'a4']],
  ])('正确填充初始数据: %d', async (_i, list, expected) => {
    const { items } = await factory({ list })

    items.forEach((item, i) => expect(item.text()).toBe(expected[i]))
  })

  it('正确计算初始位置', async () => {
    const { items } = await factory({ list: generate(5) })

    expect(getTranslateX(items[0].element as HTMLElement)).toBe('-100')
    expect(getTranslateX(items[1].element as HTMLElement)).toBe('0')
    expect(getTranslateX(items[2].element as HTMLElement)).toBe('100')
    expect(getTranslateX(items[3].element as HTMLElement)).toBe('200')
    expect(getTranslateX(items[4].element as HTMLElement)).toBe('300')
  })

  it('初始化后，元素的transition为none', async () => {
    const { items } = await factory({ list: generate(5) })

    expect((items[0].element as HTMLElement).style.transition).toBe('none')
  })

  it('当autoplay为true时，自动轮播', async () => {
    const { wrapper } = await fast(() =>
      factory({ list: generate(5), autoplay: true })
    )

    expect(wrapper.vm.active).toBe(2)
  })

  it('轮播后，元素偏移正确且带有过渡动画', async () => {
    const { wrapper, getItems } = await fast(() =>
      factory({
        list: generate(5),
        autoplay: true,
      })
    )

    const items = getItems()

    expect(getTranslateX(items[0].element as HTMLElement)).toBe('-200')

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('轮播后，正确显示数据', async () => {
    const { wrapper, getItems } = await fast(() =>
      factory({
        list: generate(5),
        autoplay: true,
      })
    )

    await wrapper.trigger('transitionend')

    const items = getItems()

    expect(items[0].text()).toBe('a1')
    expect(items[1].text()).toBe('a2')
    expect(items[2].text()).toBe('a3')
    expect(items[3].text()).toBe('a4')
    expect(items[4].text()).toBe('a5')

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('向右轮播后，正确显示数据', async () => {
    const { wrapper, getItems } = await fast(() =>
      factory({
        list: generate(5),
        autoplay: true,
        toRight: true,
      })
    )

    await wrapper.trigger('transitionend')

    const items = getItems()

    expect(wrapper.vm.active).toBe(0)
    expect(items[0].text()).toBe('a4')
    expect(items[1].text()).toBe('a5')
    expect(items[2].text()).toBe('a1')
    expect(items[3].text()).toBe('a2')
    expect(items[4].text()).toBe('a3')

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('可通过按钮向左向右滑动', async () => {
    const { wrapper, leftButton, getItems, rightButton } = await factory({
      list: generate(5),
    })

    await fast(async () => {
      await leftButton.trigger('click')
      await wrapper.trigger('transitionend')
    })

    const items = getItems()

    expect(wrapper.vm.active).toBe(2)
    expect(items[0].text()).toBe('a1')
    expect(wrapper.html()).toMatchSnapshot()

    await fast(async () => {
      await rightButton.trigger('click')
      await wrapper.trigger('transitionend')
    })

    expect(wrapper.vm.active).toBe(1)
    expect(items[0].text()).toBe('a5')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('多次向右滑动后，active正确', async () => {
    const { wrapper, getItems, rightButton } = await factory({
      list: generate(5),
    })

    await fast(async () => {
      await rightButton.trigger('click')
      await wrapper.trigger('transitionend')
      vi.runAllTimers()
      await rightButton.trigger('click')
      await wrapper.trigger('transitionend')
    })

    const items = getItems()

    expect(wrapper.vm.active).toBe(4)
    expect(items[0].text()).toBe('a3')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('连续多次点击同一按钮，不会触发多次滑动', async () => {
    const { wrapper, leftButton, getItems } = await factory({
      list: generate(5),
    })

    await fast(async () => {
      await leftButton.trigger('click')
      await leftButton.trigger('click')
      await wrapper.trigger('transitionend')
    })

    const items = getItems()

    expect(wrapper.vm.active).toBe(2)
    expect(items[0].text()).toBe('a1')
  })

  it('hover到轮播时会暂停轮播', async () => {
    const { wrapper } = await fast(() =>
      factory({
        list: generate(5),
        autoplay: true,
      })
    )

    await wrapper.trigger('transitionend')
    await wrapper.trigger('mouseover')

    expect(wrapper.emitted('pause')).toBeTruthy()
  })
})

async function factory({
  list = [],
  autoplay = false,
  toRight = false,
}: {
  list?: string[]
  autoplay?: boolean
  toRight?: boolean
} = {}) {
  const outer = await asyncMount({
    setup: () => {
      const dataList = ref(list)
      const sliderIns = ref()

      return () => (
        <div>
          <button id='left' onClick={() => sliderIns.value?.slideLeft()}>
            left
          </button>
          <Slider
            list={dataList.value}
            autoplay={autoplay}
            toRight={toRight}
            ref={sliderIns}
          >
            {{
              default: ({ data }: { data: string }) => <div>{data}</div>,
            }}
          </Slider>
          <button id='right' onClick={() => sliderIns.value?.slideRight()}>
            right
          </button>
        </div>
      )
    },
  })

  const wrapper = outer.findComponent(Slider)
  const leftButton = outer.find('#left')
  const rightButton = outer.find('#right')

  const getItems = () => wrapper.findAll('.slider-item')

  const items = getItems()

  return { wrapper, getItems, items, leftButton, rightButton }
}

function generate(length: number) {
  return array(length, (i) => `a${i + 1}`)
}
