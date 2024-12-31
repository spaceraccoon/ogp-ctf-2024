import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword } from '../../../lib/utils'
import jwt from 'jsonwebtoken'

const generateToken = (email: string) => {
  const payload = { email }
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' })
  return token
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string' || email.length === 0 || password.length === 0) {
    return NextResponse.json({ message: 'Invalid inputs' }, { status: 400 });
  }

  const user = await prisma.users.findFirst({
    where: {
      email: {
        equals: email
      },
    },
  })

  if (user && await verifyPassword(password, user.password)) {
    const token = generateToken(email)
    const response = NextResponse.json({ message: 'Login successful' })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
      sameSite: 'strict',
    })

    return response
  }

  return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
}
