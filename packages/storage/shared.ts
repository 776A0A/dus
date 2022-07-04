import { simpleEncrypt } from '@dz7/utils';

export const ls = window.localStorage;
export const ss = window.sessionStorage;

export const storageKey = simpleEncrypt('localStorage');
export const sessionStorageKey = simpleEncrypt('sessionStorage');
