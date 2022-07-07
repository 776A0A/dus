import { tinyCrypto } from '@dus/tools'

export const ls = window.localStorage
export const ss = window.sessionStorage

export const storageKey = tinyCrypto.en('localStorage')
export const sessionStorageKey = tinyCrypto.en('sessionStorage')
