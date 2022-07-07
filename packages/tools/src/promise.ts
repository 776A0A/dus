export function resolve<D = unknown>(data?: D): Promise<D | void> {
  return Promise.resolve(data)
}

export function reject<ERR = unknown>(error?: ERR): Promise<ERR | void> {
  return Promise.reject(error)
}
