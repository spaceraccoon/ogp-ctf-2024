import { Hono } from 'hono'
import { handle } from 'hono/vercel'
export const dynamic = 'force-dynamic'
import * as crypto from 'crypto';

const app = new Hono().basePath('/api')

app.get('/users/:username/flags/:flagId', (c) => {
  const username = c.req.param('username')
  const flagId = c.req.param('flagId')
  const ctfUsername = c.req.query('ctfUsername')

  if (username !== 'public') {
    return c.json({
      message: `You cannot view ${username} user's flags!`
    })
  }

  if (flagId !== '1') {
    return c.json({
      message: `${username} user's flag is expired!`
    })  
  }

  if (!ctfUsername) {
    return c.json({
      message: 'Add your CTF username as a ctfUsername query parameter like ?ctfUsername=...'
    })
  }

  
  return c.json({
    message: `3v3ry_1d_C0unt5_${crypto.createHash('md5').update(process.env.FLAG_KEY || '').digest('hex') }`
  })
})

export const GET = handle(app)