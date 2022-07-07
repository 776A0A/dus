import { ArrayBuffer as AB } from 'spark-md5';

export function md5(blob: Blob) {
	return new Promise<string>((resolve, reject) => {
		const spark = new AB();
		const reader = new FileReader();

		reader.onload =
			(e) => {
				spark.append((e.target as FileReader).result as ArrayBuffer);

				resolve(spark.end());
			};

		reader.onerror =
			(err) => {
				if (blob.type) {
					reject(err);
				} else {
					reject('无法解析该类型文件');
				}
			};

		reader.readAsArrayBuffer(blob);
	},);
}
