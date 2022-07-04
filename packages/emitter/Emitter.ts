import { createNanoEvents } from 'nanoevents';

export class Emitter<
	EventsMap extends NormalObj,
	Events extends keyof EventsMap = keyof EventsMap,
> {
	private _emitter = createNanoEvents<EventsMap>();

	on<E extends Events>(event: E, cb: EventsMap[E]) {
		return this._emitter.on(event, cb);
	}

	emit<E extends Events>(event: E, ...params: Parameters<EventsMap[E]>) {
		return this._emitter.emit(event, ...params);
	}

	clear() {
		this._emitter.events = {};
	}

	get events() {
		return this._emitter.events;
	}
}

export function createEmitter<EventsMap extends NormalObj>() {
	return new Emitter<EventsMap>();
}
