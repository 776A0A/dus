export async function concurrent(params: {
  count: number
  total: number
  request: (idx: number) => Promise<void>
}) {
  const { count, total, request } = params

  return new Promise<void>((resolve) => {
    let frees = count ?? 0
    let idx = 0
    let counter = 0
    const len = total

    const start = () => {
      while (frees > 0 && idx < len) {
        frees--
        request(idx++).then(() => {
          frees++
          counter++
          if (counter === len) {
            resolve()
          } else {
            start()
          }
        })
      }
    }

    start()
  })
}
