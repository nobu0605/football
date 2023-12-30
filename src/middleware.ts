import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('originUrl') ?? ''
  const allowedOrigin = process.env.API_ENDPOINT || ''

  // TODO - Add a better check for allowed origins
  if (origin !== allowedOrigin) {
    throw new Error('Not allowed origin')
  }
}

export const config = {
  matcher: '/api/:path*',
}
