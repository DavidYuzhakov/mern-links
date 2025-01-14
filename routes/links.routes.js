import { Router } from "express"
import config from "config"
import auth from "../middleware/auth.middleware.js"
import Link from "../models/Link.js"
import { nanoid } from "nanoid"
const router = new Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')
    const {from} = req.body

    const code = nanoid()

    const existing = await Link.findOne({ from })
    if (existing) {
      return res.json({ link: existing })
    }

    const to = baseUrl + '/t/' + code
    const link = new Link({
      code, to, from, owner: req.user.userId
    })

    await link.save()
    res.status(201).json({link})

  } catch (e) {
    res.status(500).json({ message: 'Failter to generate link' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId }) 
    
    res.status(200).json(links)
  } catch (e) {
    res.status(500).json({ message: 'Failter to get all links' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Failter to get this link' })
  }
})

export default router