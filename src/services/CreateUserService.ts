import { getCustomRepository } from 'typeorm'
import { UserRepositories } from "../repositories/UserRepositories"

interface IUserRequest {
 name: string;
 email: string;
 admin?: boolean
}

class CreateUserService {

 async execute({ name, email, admin }: IUserRequest) {
  const userRepositories = getCustomRepository(UserRepositories)

  if(!email || email==='') {
   //throw error object to upper layer with custom message
   throw new Error('Incorrect email!')

  }

  const userAlreadyExists = await userRepositories.findOne({
   email
  })

  if (userAlreadyExists) {
   //throw error object to upper layer with custom message
   throw new Error('User already exists!')
  }

  //if nothing bad happens, finish to create user and save on db
  const user = userRepositories.create({
   name,
   email, 
   admin
  })

  await userRepositories.save(user)

  //return user to upper layer
  return user
 }

}

export { CreateUserService }