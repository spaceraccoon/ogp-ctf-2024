import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { JSDOM } from 'jsdom'
import * as crypto from 'crypto'

export const dynamic = 'force-dynamic'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono on Vercel!'
  })
})

const escapeHTML = (html: string) => {
  return html.replace(
    /[&<>'"]/g,
    (toReplace) => { 
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[toReplace] || toReplace
    }
  );
}

app.get('/preview', (c) => {
  const name = c.req.query('name') || ''
  const flag = `51mp13_x55_${crypto.createHash('md5').update(process.env.FLAG_KEY || '').digest('hex')}`
  const html = `<script>function getFlag() { document.getElementById('content').innerHTML = 'Congrats, heres the flag: ${flag}' }</script>
  <div id="content">
    <div id="${name}">
      Hello ${escapeHTML(name)}!
    </div>
  </div>
  `

  const dom = new JSDOM(html, { resources: 'usable', runScripts: 'dangerously' })

  return c.html(dom.window.document.getElementById('content')?.innerHTML || '')
})

export const GET = handle(app)