/* eslint-disable no-console */
import { mapUrlStorage } from '~/logic'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

const addSourceMap = (header: any) => {
  const removeQuery = (url: string) => {
    return url.split('?')[0]
  }

  const isJsFile = (url: string) => {
    return removeQuery(url).endsWith('.js')
  }

  const getHash = (url: string) => {
    return removeQuery(url).split('/').pop() ?? ''
  }

  if (isJsFile(header.url)) {
    const hash = getHash(header.url ?? '')
    const mapFilePath = mapUrlStorage.value[hash]
    console.log('mapFilePath', mapFilePath)

    if (!mapFilePath)
      return
    const { responseHeaders } = header
    responseHeaders.push({ name: 'SourceMap', value: mapFilePath })
    console.log('responseHeaders', responseHeaders)
    return { responseHeaders }
  }
}

if (!chrome.webRequest.onHeadersReceived.hasListener(addSourceMap)) {
  chrome.webRequest.onHeadersReceived.addListener(addSourceMap, { urls: ['*://*/*'] }, ['blocking', 'responseHeaders'])
  console.log('Sourcemap Connector works!')
}
