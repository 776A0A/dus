import { Unsubscribe } from 'nanoevents';
import { onMounted, onUnmounted } from 'vue';
import { Emitter } from './Emitter';

class VueEmitter<EventsMap extends NormalObj> extends Emitter<EventsMap> {
	/**
   * 在 onUnmount 时自动卸载监听，可链式调用
   * @param immediate - 在创建组件时开始监听还是在 onMounted 后开始
   * @returns Emitter
   */
	autoUnbind<E extends keyof EventsMap>(event: E, cb: EventsMap[E], { immediate = true } = {}) {
		let unbind: Unsubscribe;

		if (immediate) {
			unbind = this.on(event, cb);
		} else {
			onMounted(() => (unbind = this.on(event, cb)));
		}

		onUnmounted(() => unbind?.());

		return this;
	}
}

export function createVueEmitter<EventsMap extends NormalObj>() {
	return new VueEmitter<EventsMap>();
}
