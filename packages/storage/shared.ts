import { simpleEncrypt } from '@dz7/tools';

export const ls = window.localStorage;
export const ss = window.sessionStorage;

export const storageKey = simpleEncrypt('localStorage');
export const sessionStorageKey = simpleEncrypt('sessionStorage');
