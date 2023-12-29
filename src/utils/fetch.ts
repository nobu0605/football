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
  cache: RequestCache = 'no-store',
  headers?: Headers,
) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + path, {
    method,
    headers,
    cache,
  })
  const data = await res.json()

  return data
}
