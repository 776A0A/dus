import { vi } from 'vitest'

export function injectBrowserEnv() {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  )
    .stubGlobal('URL', {
      createObjectURL: () => 'fake blob url',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      revokeObjectURL: () => {},
    })
    .stubGlobal('open', vi.fn())
}
