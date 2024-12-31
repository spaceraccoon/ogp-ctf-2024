import type { VercelRequest, VercelResponse } from '@vercel/node'
import * as crypto from 'crypto'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { dest = 'https://gov.sg', username } = req.query
  
  if (typeof username !== 'string' || username.length === 0) {
    return res.status(400).json({
      message: `Username must be a string and cannot be empty!`,
    })
  }

  if (typeof dest !== 'string' || !dest.startsWith('https://gov.sg')) {
    return res.status(403).json({
      message: `You can only redirect to https://gov.sg!`,
    })
  }

  if ((new URL(dest)).hostname === 'open.gov.sg') {
    const digest = crypto
      .createHash('md5')
      .update(process.env.FLAG_KEY || '')
      .update(username)
      .digest("hex") 
    return res.status(200).json({
      message: `The flag is v@1!d@te_ur15_pr0p3rly_${digest}`
    })
  }
  return res.redirect(dest)
}
