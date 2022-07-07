import { callWithErrorCatch, logError } from '@dz7/tools'
import { ref } from 'vue'

export function useRouterError(validator?: () => boolean) {
  const error = ref(false)

  return { error, handleError }

  function handleError(error: any) {
    const errorPrefix = 'Error from router: \n'
    const message = error?.message ? (error.message as string) : error

    callWithErrorCatch(() => {
      logError(`${errorPrefix}`)
      logError(message)
    })

    if (validator?.()) {
      return
    }
    // 中断的路由不做处理
    if ((message as string).toLowerCase().includes('abort')) {
      return
    }

    error.value = true
  }
}
