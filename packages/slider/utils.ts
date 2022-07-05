export function getTranslateX(el: HTMLElement) {
	return (
		el.style.transform.match(/translate3d\((.+)(px|%),\s*.+,\s*.+\)/)?.[
			1
		] ?? '0'
	);
}

export function transform(el: HTMLElement, x: number, scale: number) {
	el.style.transform = `translate3d(${x}%, 0, 0) scale(${scale})`;
}

export function transition(el: HTMLElement, transition: string) {
	el.style.transition = transition;
}
