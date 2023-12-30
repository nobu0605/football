import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('host') ?? ''
  const url = new URL(process.env.NEXT_PUBLIC_API_ENDPOINT || '')
  const domainWithPort = `${url.hostname}:${url.port || ''}`

  if (origin !== domainWithPort) {
    throw new Error('Not allowed origin')
  }
}

export const config = {
  matcher: '/api/:path*',
}
