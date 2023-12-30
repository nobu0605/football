import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('originUrl') ?? ''
  const allowedOrigin = process.env.API_ENDPOINT || ''

  console.log('request.headers.get(host): ', request.headers.get('host'))
  console.log('origin: ', origin)
  console.log('allowedOrigin: ', allowedOrigin)
  if (origin !== allowedOrigin) {
    throw new Error('Not allowed origin')
  }
}

export const config = {
  matcher: '/api/:path*',
}
