import { ref } from 'vue';
import { useQueryHelper } from './useQueryHelper';

/**
 * 🛑 注意：传入的queryFn必须返回数组
 */
export const useQueryList = useQueryHelper<ReturnType<typeof init>>({
	init,
	beforeRequest: ({ state: { isEmpty } }) => (isEmpty.value = false),
	resolveRequest: ({ res, state: { isEmpty } }) => {
		if (res.length === 0) {
			isEmpty.value = true;
		}
	},
},);

function init() {
	return { isEmpty: ref(false) };
}
