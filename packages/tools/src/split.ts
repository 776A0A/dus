import Split from 'split.js'
import { callInSafe } from './callInSafe'
import { logError } from './logError'

interface SplitScreen {
  (getElements: () => (HTMLElement | string)[], options?: Split.Options): {
    open: VoidFunction
    close: VoidFunction
  }

  createGutter: typeof createGutter
}

const split: SplitScreen = (getElements, options) => {
  let splitIns: Split.Instance | undefined = undefined

  const open = () => {
    splitIns = Split(
      getElements(),
      Object.assign(
        {
          minSize: 500,
          gutter: () =>
            createGutter({
              ...(options?.gutterStyle as any)?.(),
            }),
        },
        options
      )
    )
  }

  const close = () => {
    callInSafe(
      () => {
        splitIns?.destroy()
        splitIns = undefined
      },
      () => logError('----- From splitScreen, should be ignored. -----')
    )
  }

  return { open, close }
}

split.createGutter = createGutter

export { split as splitScreen }

function createGutter(gutterStyle?: Record<string, string | number>) {
  const gutterBgImage = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==')`

  const defaultStyle: Record<string, string | number> = {
    backgroundColor: '#eee',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
    backgroundImage: gutterBgImage,
    width: '10px',
    cursor: 'col-resize',
  }

  const styles = { ...defaultStyle, ...gutterStyle }

  const parent = document.createElement('div')
  const child = document.createElement('div')

  parent.classList.add('split-screen-gutter-item')

  Object.assign(parent.style, { display: 'flex' })
  Object.assign(child.style, styles)

  parent.appendChild(child)

  return parent
}
