export const tinyCrypto = {
	en: (v: any) => window.btoa(window.encodeURIComponent(JSON.stringify(v))),
	de: <T = unknown>(v: any) =>
		JSON.parse(window.decodeURIComponent(window.atob(v))) as T,
};
