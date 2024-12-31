import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashSaltPassword } from '../../../lib/utils'

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password || typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string' || name.length === 0 || email.length === 0 || password.length === 0) {
    return NextResponse.json({ message: 'Invalid inputs' }, { status: 400 });
  }

  if (email.split('@').pop() !== 'ogpctf.com') {
    return NextResponse.json({ message: 'Email must be @ogpctf.com' }, { status: 400 });
  }

  const user = await prisma.users.findFirst({
    where: {
      email: {
        equals: email.replaceAll(/_/g, '\\_').replaceAll(/%/g, '\\%'),
        mode: 'insensitive',
      },
    },
  })
  
  if (user !== null) {
    return NextResponse.json({ message: 'User with email already exists' }, { status: 400 });
  } else {
    await prisma.users.create({
      data: {
        name,
        email,
        password: await hashSaltPassword(password),
      }
    })
    return NextResponse.json({ message: 'User created' }, { status: 200 });
  }
}
