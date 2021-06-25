import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepositories } from '../repositories/UserRepositories'

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
 //verify if admin

 const { userId } = request
 console.log(userId)

 const usersRepositories = getCustomRepository(UserRepositories)

 const { admin } = await usersRepositories.findOne(userId)
 
 if (admin) {
  return next()
 }

 return response.status(401).json({ error: 'Unauthorized' })

}