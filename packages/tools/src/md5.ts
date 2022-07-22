export function md5(blob: Blob) {
  return new Promise<string>(async (resolve, reject) => {
    const spark = new (await import('spark-md5')).ArrayBuffer()
    const reader = new FileReader()

    reader.onload = (e) => {
      spark.append((e.target as FileReader).result as ArrayBuffer)

      resolve(spark.end())
    }

    reader.onerror = (err) => {
      if (blob.type) {
        reject(err)
      } else {
        reject('无法解析该类型文件')
      }
    }

    reader.readAsArrayBuffer(blob)
  })
}
