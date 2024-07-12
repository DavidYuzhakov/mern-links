import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import {body, validationResult} from 'express-validator'
import User from '../models/User.js'
const router = Router()

// /api/auth/register
router.post(
  '/register', 
  [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум из 6 символов').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
      }

      const {email, password} = req.body
      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({
          message: 'User is exist!'
        })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()
      res.status(201).json({
        message: "User has been created"
      })

    } catch (e) {
    res.status(500).json({
      message: 'Failed to register'
    })
    }
  }
)

// /api/auth/login
router.post(
  '/login', 
  [
    body('email', 'Неверный формат почты').normalizeEmail().isEmail(),
    body('password', 'Пароль должен быть минимум из 6 символов').exists().isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
      }

      const {email, password} = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({
          message: 'User is not exist'
        })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({
          message: 'Неверный пароль или email'
        })
      }

      const token = jwt.sign( //sign - создание токена
        { userId: user.id }, // инфа 
        config.get('jwtSecret'), // приватный ключ 
        { expiresIn: '30d'} // опции
      )

      res.json({ token, userId: user.id })

    } catch (e) {
      res.status(500).json({
        message: 'Failed to login'
      })
    }
  } 
)


export default router