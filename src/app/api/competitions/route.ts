import { NextRequest, NextResponse } from 'next/server'
import { fetchFootballData } from '@/utils/fetch'

export async function GET(
  request: NextRequest,
  { params }: { params: { leagueName: string } },
): Promise<NextResponse> {
  const data = await fetchFootballData('GET', `/v4/competitions`)

  return NextResponse.json(data)
}
