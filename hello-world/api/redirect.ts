import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { dest = 'https://gov.sg' } = req.query
  
  if (typeof dest !== 'string' || !dest.startsWith('https://gov.sg')) {
    return res.status(403).json({
      message: `You can only redirect to https://gov.sg!`,
    })
  }

  return res.redirect(dest)
}
