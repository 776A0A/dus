import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import merge from 'lodash.merge';
import { injectBrowserEnv } from './injectBrowserEnv';

export async function asyncMount<C = Parameters<typeof mount>[0]>(
	component: Partial<C>,
	props?: Parameters<typeof mount>[1],
) {
	injectBrowserEnv();

	if (props) {
		merge(props, { attachTo: 'body' });
	}

	const wrapper = mount(component as C, props);

	await nextTick();

	return wrapper;
}
