import {
  decompressFromEncodedURIComponent as decode,
  compressToEncodedURIComponent as encode
} from 'lz-string'

export function read() {
  const hash = document.location.hash.slice(1)
  if (!hash) {
    return null
  }

  try {
    return JSON.parse(decode(hash))
  } catch (_) {
    return {}
  }
}

export function write(jsonString) {
  const hash = encode(jsonString)

  if (
    typeof URL === 'function' &&
    typeof history === 'object' &&
    typeof history.replaceState === 'function'
  ) {
    const url = new URL(location)
    url.hash = hash
    history.replaceState(null, null, url.href)
  } else {
    location.hash = hash
  }
}
