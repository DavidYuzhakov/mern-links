import express from 'express'
import config from 'config'
import path from "path"
import mongoose from 'mongoose'
import authRoutes from './routes/auth.routes.js'
import linksRouts from './routes/links.routes.js'
import redirectRouts from './routes/redirect.routes.js'

const app = express()
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/links', linksRouts)
app.use('/t', redirectRouts)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

const PORT = config.get('port') || 4444

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'))
    app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))
  } catch (e) {
    console.log('DB error', e.message)
    process.exit(1) // выход из процесса
  }
}

start()