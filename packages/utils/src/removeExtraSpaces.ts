export function removeExtraSpaces(value?: StringOrNumber) {
	return String(value ?? '').trim().replace(/\s{2,}/g, ' ');
}
