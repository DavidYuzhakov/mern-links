import { Router } from "express";
import Link from "../models/Link.js";
const router = new Router()

router.get('/:code', async (req, res) => {
  try {
    const code = req.params.code
    const link = await Link.findOneAndUpdate({ code }, { $inc: { clicks: 1 } })
    
    if (link) {
      await link.save()
      return res.redirect(link.from)
    }

    return res.status(404).json({ message: 'Link is not found '})
  } catch (e) {
    res.status(500).json({ message: 'Failed to get redirect url'})
  }
})

export default router