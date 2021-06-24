import { getCustomRepository } from 'typeorm'
import { UserRepositories } from '../repositories/UserRepositories'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { ErrorHandler } from '../handlers/ErrorHandler'

interface IAuthenticateRequest {
 email: string,
 password: string
}

class AuthenticateUserService {

 async execute({ email, password }: IAuthenticateRequest) {
  const userRepositories = getCustomRepository(UserRepositories)

  const user = await userRepositories.findOne({ email })

  //verify if email exists
  if (!user) {
   //throw error object to upper layer with custom parameters
   const err = {
    name: 'IncorrectLogin',
    message: 'Incorrect Email/Password',
    statusCode: 400,
    description: 'There is an error with your authentication credentials.'
   }

   throw new ErrorHandler(err)
  }
  
  //method to compare password and stored password hash
  const passwordMatch = await compare(password, user.password)

  //check password hash
  if(!passwordMatch) {
   //throw error object to upper layer with custom parameters
   const err = {
    name: 'IncorrectLogin',
    message: 'Incorrect Email/Password',
    statusCode: 400,
    description: 'There is an error with your authentication credentials.'
   }

   throw new ErrorHandler(err)
  }

  //generate token
  const token = sign(
   { email: user.email }, 
   'bbeb2a51754fc61b9896207ef3b0dc65', 
   { subject: user.id, expiresIn: '1d' }
  )

  return token

 } 

}

export { AuthenticateUserService }