import { NextRequest, NextResponse } from 'next/server'
import { errorMessages } from '@/constants/error'
import { fetchFootballData } from '@/utils/fetch'

export async function GET(
  request: NextRequest,
  { params }: { params: { teamId: string } },
): Promise<NextResponse> {
  const data = await fetchFootballData('GET', `/v4/teams/${params.teamId}`)

  if (data.errorCode === 403) {
    return NextResponse.json(
      {
        error: {
          code: 403,
          message: errorMessages[403],
        },
      },
      { status: 403 },
    )
  }

  return NextResponse.json(data)
}
