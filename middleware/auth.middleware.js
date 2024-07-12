import jwt from "jsonwebtoken"
import config from "config"

export default async function (req, res, next) {
  if (req.method === 'OPTIONS') { // спец. метод в RestAPI, который проверяет доступность сервера
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1] // authorization - сами сделали из фронта. ответ "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({ message: "User has not been authorized"})
    }
    const decoded = await jwt.verify(token, config.get('jwtSecret')) // раскодирует токен
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: "User has not been authorized!"})
  }
}