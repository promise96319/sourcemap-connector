/* eslint-disable no-console */
import { getUrlMap } from '~/logic/folder-storage'

// only on dev mode
// if (import.meta.hot) {
//   // @ts-expect-error for background HMR
//   import('/@vite/client')
//   // load latest content script
//   import('./contentScriptHMR')
// }

let latestUrlMap: Record<string, string>

const addSourceMap = (header: any) => {
  const removeQuery = (url = '') => {
    return url.split('?')[0]
  }

  const isJsFile = (url = '') => {
    return removeQuery(url).endsWith('.js')
  }

  const isCssFile = (url = '') => {
    return removeQuery(url).endsWith('.css')
  }

  const getHash = (url = '') => {
    return removeQuery(url).split('/').pop() ?? ''
  }

  if (isJsFile(header.url) || isCssFile(header.url)) {
    const hash = getHash(header.url)
    const urlMap = latestUrlMap || getUrlMap()
    console.log('urlMap', urlMap)
    const mapFilePath = urlMap[hash]

    if (!mapFilePath)
      return
    const { responseHeaders } = header
    responseHeaders.push({ name: 'SourceMap', value: mapFilePath })
    return { responseHeaders }
  }
}

if (!chrome.webRequest.onHeadersReceived.hasListener(addSourceMap)) {
  chrome.webRequest.onHeadersReceived.addListener(addSourceMap, { urls: ['*://*/*'] }, ['blocking', 'responseHeaders'])
  console.log('Sourcemap Connector works!')
}

browser.runtime.onMessage.addListener((message) => {
  latestUrlMap = message
})
