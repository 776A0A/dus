import { useQuery } from '@dz7/hooks'
import storage from '@dz7/storage'
import { tinyCrypto } from '@dz7/tools'
import { defineStore } from 'pinia'
import { watch } from 'vue'

// window.encodeURIComponent(window.btoa('userData'))
const userKey = 'dXNlckRhdGE%3D'

function createUserStore<Data, P>(
  getUser: (args: P) => Promise<Data | null>,
  setToken: (user: Data) => void,
  options?: { tokenKey?: keyof Data }
) {
  const { data: user, query: fetchUser } = useQuery(
    async (args: P) => getUser(args),
    { defaultValue: null }
  )

  watch(
    user,
    (d) => {
      storage.set(userKey, d ? tinyCrypto.en(d) : d)

      if (!d) {
        return
      }

      setToken(d)
      deleteTokenFromData(d)
    },
    { deep: true }
  )

  const useUserStore = defineStore('user', () => {
    return { user }
  })

  return {
    useUserStore,
    fetchUser,
    setUser,
    initUser,
    getLocalUser,
    clearUser,
  }

  function deleteTokenFromData(d: Awaited<Data>) {
    if (options?.tokenKey && d[options.tokenKey]) {
      delete d[options.tokenKey]
    }
  }

  function initUser() {
    user.value = getLocalUser()
  }

  function setUser(data: Data) {
    user.value = { ...user.value, ...(data as any) }
  }

  function getLocalUser() {
    const user = storage.get<string>(userKey)

    if (!user) {
      return null
    }

    return tinyCrypto.de<Awaited<Data>>(user)
  }

  function clearUser() {
    storage.remove(userKey)
  }
}

export { createUserStore, userKey }
