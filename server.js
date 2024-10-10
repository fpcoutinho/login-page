import express from 'express'
import { createServer } from 'vite'
import * as fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
})

app.use(vite.middlewares)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/registration', async (req, res, next) => {
  try {
    let template = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    )

    template = await vite.transformIndexHtml(req.originalUrl, template)

    const render = (await vite.ssrLoadModule('/src/entry-server.js')).render

    const { html: appHtml } = await render()
    const html = template.replace('<!--main-app-->', appHtml)

    res.set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    vite.ssrFixStacktrace(e)
    next(e)
  }
})

app.post('/registration', async (req, res, next) => {
  const { email, type, name, phone, password } = req.body
  let client = {}

  if (type === 'pf') {
    const { cpf, birthdate } = req.body
    client = {
      email,
      name,
      cpf,
      birthdate,
      phone,
      password,
    }
  } else if (type === 'pj') {
    const { cnpj, foundationdate } = req.body
    client = {
      email,
      name,
      cnpj,
      foundationdate,
      phone,
      password,
    }
  } else {
    res.status(422).json({ error: 'Tipo de cliente inválido' })
    return
  }

  let hasEmptyFields = false

  for (let key in client) {
    if (client[key].length === 0) {
      hasEmptyFields = true
    }
  }

  if (hasEmptyFields) {
    res.status(422).json({ error: 'Cliente com campos em branco.' })
  } else {
    res.status(201).json({ message: 'Sucesso!', client: client })
  }
})

app.get('*', function (req, res) {
  res.redirect('/registration')
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/')
})
