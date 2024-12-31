import { NextResponse } from 'next/server'
import {getSession} from "@/app/api/auth/[...nextauth]/auth";

export async function GET(request: Request) {
  const session = await getSession()

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401
    })
  }

  console.log('GET API', session)
  return NextResponse.json({ authenticated: !!session })
}
