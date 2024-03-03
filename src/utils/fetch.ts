const footballAPIEndpoint = 'http://api.football-data.org'

export async function fetchFootballData(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  cache: RequestCache = 'no-store',
) {
  const res = await fetch(footballAPIEndpoint + path, {
    method,
    headers: {
      'X-Auth-Token': process.env.FOOTBALL_DATA_API_TOKEN || '',
    },
    cache,
  })
  const data = await res.json()

  return data
}

export async function fetchFromAPI(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  cache: RequestCache = 'force-cache',
  headers?: Headers,
) {
  const _headers = headers
    ? {
        ...headers,
        originUrl: window.location.origin,
      }
    : { originUrl: window.location.origin }

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + path, {
    method,
    headers: _headers,
    cache,
  })
  const data = await res.json()

  return data
}
