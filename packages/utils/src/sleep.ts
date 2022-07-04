/**
 * @param time - 等待时间，ms，默认值 0
 */
export async function sleep(time = 0) {
	await new Promise((resolve) => setTimeout(resolve, time));
}
