import { getCustomRepository } from 'typeorm'
import { UserRepositories } from "../repositories/UserRepositories"
import { ErrorHandler } from '../handlers/ErrorHandler'
import { hash } from 'bcryptjs'

interface IUserRequest {
 name: string;
 email: string;
 admin?: boolean
 password: string;
}

class CreateUserService {

 async execute({ name, email, admin = false, password }: IUserRequest) {
  const userRepositories = getCustomRepository(UserRepositories)

  //check if user email is valid
  if(!email || email==='') {

   //throw error object to upper layer with custom parameters
   const err = {
    name: 'UserEmailError',
    message: 'Invalid user email',
    statusCode: 400,
    description: 'User email is invalid. Please check if your email are being sent or is not null'
   }

   throw new ErrorHandler(err)
  }

  //check if user already exists on db, by email
  const userAlreadyExists = await userRepositories.findOne({ email })

  if (userAlreadyExists) {

   //throw error object to upper layer with custom parameters
   const err = {
    name: 'UserEmailAlreadyExistsError',
    message: 'User email already registered',
    statusCode: 400,
    description: 'User email is already registered. Please inform another user email'
   }

   throw new ErrorHandler(err)
  }

  const passwordHash = await hash(password, 8)

  //if nothing bad happens, finish to create user and save on db
  const user = userRepositories.create({
   name,
   email, 
   admin,
   password: passwordHash 
  })

  await userRepositories.save(user)

  //return user to upper layer
  return user
 }

}

export { CreateUserService }