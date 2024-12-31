import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import * as crypto from 'crypto';

import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string }
    return decoded  // Return the decoded token, containing the user's data
  } catch (error) {
    return null  // If token is invalid or expired, return null
  }
}

const Flag = async () => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  // Check if the token is present and valid
  const decoded = token ? verifyToken(token) : null

  if (decoded === null) {
    redirect('/')
  }

  const user = await prisma.users.findFirst({
    where: {
      email: {
        equals: decoded.email,
        mode: 'insensitive',
      },
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200 py-12 px-6 sm:px-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Flag</h1>
          <a href="/logout">
          <button 
            className="text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Logout
          </button></a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center">
              <span className="text-xl font-bold">{user!.email?.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{user!.email}</h2>
              <p className="text-sm text-gray-600">Flag: {`${user!.id === 1 ? 'pr15m@_fI1t3r_f00tgun_'+crypto
      .createHash('md5')
      .update(process.env.FLAG_KEY || '')
      .update(decoded.email)
      .digest("hex") : 'Only available for administratoruser@ogpctf.com'}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Flag;
