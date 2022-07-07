import { describe, expect, it } from 'vitest'
import { escapeDanger } from '../escapeDanger'

describe('escapeDanger', () => {
  it('转义 ', () => {
    expect(escapeDanger(' ')).toBe(' ')
  })

  it('转义xx', () => {
    expect(escapeDanger('xx')).toBe('xx')
  })

  it('转义&', () => {
    expect(escapeDanger('&')).toBe('&amp;')
  })

  it('转义<', () => {
    expect(escapeDanger('<')).toBe('&lt;')
  })

  it('转义>', () => {
    expect(escapeDanger('>')).toBe('&gt;')
  })

  it("转义'", () => {
    expect(escapeDanger("'")).toBe('&#x27;')
  })

  it('转义"', () => {
    expect(escapeDanger('"')).toBe('&quot;')
  })

  it('转义/', () => {
    expect(escapeDanger('/')).toBe('&#x2F;')
  })

  it('转义xx&&<  <>>" "\'\'//   ', () => {
    expect(escapeDanger('xx&&<  <>>" "\'\'//   ')).toBe(
      'xx&amp;&amp;&lt;  &lt;&gt;&gt;&quot; &quot;&#x27;&#x27;&#x2F;&#x2F;   '
    )
  })
})
