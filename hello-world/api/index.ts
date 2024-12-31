import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  return res.json({
    message: `Hello! Try to get /redirect?dest=<payload> to redirect to https://open.gov.sg! Then use the same payload to get the flag at /flag?dest=<payload>&username=<YOUR CTF USERNAME>!`,
  })
}
