import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'
import { CONFIG } from 'site.config'

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null)
  const { systemTheme, theme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  // https://github.com/giscus/giscus/tree/main/styles/themes
  const giscusTheme = isDark ? 'dark' : 'light'

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const scriptElem = document.createElement('script')
    scriptElem.src = 'https://giscus.app/client.js'
    scriptElem.async = true
    scriptElem.crossOrigin = 'anonymous'

    scriptElem.setAttribute('data-repo', CONFIG.giscus.repo)
    scriptElem.setAttribute('data-repo-id', CONFIG.giscus.repoId)
    scriptElem.setAttribute('data-category', CONFIG.giscus.category)
    scriptElem.setAttribute('data-category-id', CONFIG.giscus.categoryId)
    scriptElem.setAttribute('data-mapping', 'pathname')
    scriptElem.setAttribute('data-strict', '0')
    scriptElem.setAttribute('data-reactions-enabled', '1')
    scriptElem.setAttribute('data-emit-metadata', '0')
    scriptElem.setAttribute('data-input-position', 'bottom')
    scriptElem.setAttribute('data-theme', giscusTheme)
    scriptElem.setAttribute('data-lang', 'ko')

    ref.current.appendChild(scriptElem)
  }, [])

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme: giscusTheme } } }, 'https://giscus.app')
  }, [giscusTheme])

  return <section ref={ref} />
}
