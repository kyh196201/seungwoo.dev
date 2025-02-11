import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'

const redis = Redis.fromEnv()

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json()
  const slug = body.slug as string | undefined

  // body에 slug가 없을 경우
  if (!slug) {
    return new NextResponse('Slug not found', { status: 400 })
  }

  const { ip } = request
  // Hash the IP and turn it into a hex string
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip))
  const hash = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  // 접속한 IP에 대해서 1시간 동안 유지되는 키를 생성
  // 동일한 사용자가 1시간 동안 여러번 방문했을 때 조회수가 중복 증가하는 것을 방지
  const isNew = await redis.set(['deduplicate', hash, slug].join(':'), true, {
    nx: true,
    ex: 60 * 60, // 초
  })

  if (!isNew) {
    return new NextResponse(null, { status: 202 })
  }

  await redis.incr(['pageviews', 'blogs', slug].join(':'))
  return new NextResponse(null, { status: 202 })
}
