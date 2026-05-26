import { chromium } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC = path.join(__dirname, '..', 'public')
const BASE = 'http://localhost:3003'

// width/height en pulgadas. 1in = 96 CSS px.
// A4 = 8.27 x 11.69, A5 landscape = 8.27 x 5.83, Slide 1920x1080 = 20 x 11.25
const JOBS = [
  {
    html: 'Diapositivas.html',
    pdf: 'Diapositivas.pdf',
    opts: { width: '20in', height: '11.25in', margin: { top: 0, right: 0, bottom: 0, left: 0 }, printBackground: true },
  },
  {
    html: 'Folleto del asistente.html',
    pdf: 'Folleto del asistente.pdf',
    opts: { format: 'A4', printBackground: true, preferCSSPageSize: true },
  },
  {
    html: '10 Prompts esenciales.html',
    pdf: '10 Prompts esenciales.pdf',
    opts: { format: 'A4', printBackground: true, preferCSSPageSize: true },
  },
  {
    html: 'Tarjeta A5.html',
    pdf: 'Tarjeta A5.pdf',
    opts: { format: 'A5', landscape: true, printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } },
  },
]

const browser = await chromium.launch()
const ctx = await browser.newContext()

for (const job of JOBS) {
  const url = `${BASE}/${encodeURIComponent(job.html)}`
  const out = path.join(PUBLIC, job.pdf)
  console.log(`→ ${job.html}`)
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.emulateMedia({ media: 'print' })
  await page.pdf({ path: out, ...job.opts })
  await page.close()
  console.log(`  ✓ ${job.pdf}`)
}

await browser.close()
console.log('done')
