export function base64ToImage(url: string) {
  const image = new Image()
  image.src = url

  return new Promise<HTMLImageElement>((resolve, reject) => {
    image.onload = () => resolve(image)
    image.onerror = reject
  })
}
