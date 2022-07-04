import { ref } from 'vue';

export const useLoading = <T extends (...args: any[]) => any>(
	fn: T,
	options = { initialLoading: false },
) => {
	const loading = ref(options.initialLoading);

	const wrappedFn = async (...args: Parameters<T>): Promise<ReturnType<T> | void> => {
		if (loading.value && !options.initialLoading) {
			return;
		}

		options.initialLoading = false;
		loading.value = true;

		const res = fn(...args);

		if (res instanceof Promise) {
			return res.finally(() => (loading.value = false));
		}

		loading.value = false;
		return res;
	};

	return { fn: wrappedFn, loading };
};
