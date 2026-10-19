// www.lifecarelog.co.kr is a second custom domain on this Worker; every page request
// on it gets a permanent redirect to the apex with path and query intact.
export function wwwRedirectTarget(url: URL): string | null {
  if (url.hostname.toLowerCase() !== 'www.lifecarelog.co.kr') return null
  return `https://lifecarelog.co.kr${url.pathname}${url.search}`
}
