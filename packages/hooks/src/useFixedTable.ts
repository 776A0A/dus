import { useEventListener } from '@vueuse/core';
import debounce from 'lodash.debounce';
import { onMounted, Ref, ref } from 'vue';

const defaultHeaderHeight = 55; // 一般的表头高度

export const useFixedTable = (
	/**
   * table 的父级元素
   */
	tableParentElem: Ref<HTMLElement | undefined>,
	/**
   * 当无法自动获取到表头的高度时，会使用传入的高度
   */
	fallbackHeight = defaultHeaderHeight,
) => {
	const scroll = ref<{ y?: number }>({});

	const debouncedReCalc = debounce(reCalc, 300);

	onMounted(reCalc);

	useEventListener(window, 'resize', debouncedReCalc);

	return { scroll, reCalc };

	function reCalc() {
		scroll.value = calc();
	}

	function calc() {
		if (!tableParentElem.value) {
			return {};
		}

		const thead = tableParentElem.value.querySelector<HTMLTableCellElement>(
			':scope .ant-table-thead',
		);

		const theadHeight = thead?.getBoundingClientRect().height || fallbackHeight;

		const containerHeight = tableParentElem.value.parentElement?.getBoundingClientRect().height;

		return containerHeight ? { y: containerHeight - theadHeight } : {};
	}
};
