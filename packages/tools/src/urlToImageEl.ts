type ErrorHandler = (
  error: string | Event | null,
  image: HTMLImageElement
) => void

export function urlToImageEl(url: string): Promise<HTMLImageElement>
export function urlToImageEl(url: string, callback: ErrorHandler): void
export function urlToImageEl(url: string, callback?: ErrorHandler) {
  const image = new Image()
  image.src = url

  if (callback) {
    image.onload = () => callback(null, image)
    image.onerror = (error) => callback(error, image)
  } else {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      image.onload = () => resolve(image)
      image.onerror = reject
    })
  }
}
