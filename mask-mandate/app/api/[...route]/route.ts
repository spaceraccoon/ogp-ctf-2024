import { Hono } from 'hono'
import { handle } from 'hono/vercel'
export const dynamic = 'force-dynamic'
import { 
  generateRandomNricFromUnixTime,
  maskNric,
} from '../../utils'
import * as crypto from 'crypto'

const app = new Hono().basePath('/api')



app.get('/nric', (c) => {
  const [nric, birthYear] = generateRandomNricFromUnixTime()
  return c.json({
    message: "Guess my NRIC!",
    maskedNric: maskNric(nric),
    birthYear,
  })
})

app.post('/nric', async (c) => {
  const body = await c.req.json()

  const [nric, birthYear] = generateRandomNricFromUnixTime()

  return c.json({
    message: body.nric === nric ? `Correct NRIC! Your flag is w3@r_A_m@5k_${crypto
      .createHash('md5')
      .update(process.env.FLAG_KEY || '')
      .update(nric)
      .digest("hex")          }` : "Wrong NRIC!",
    maskedNric: maskNric(nric),
    birthYear,
  })
})

export const GET = handle(app)
export const POST = handle(app)