import { Request, Response } from 'express'
import { CreateUserService } from '../services/CreateUserService'

class CreateUserController {
 async handle(request: Request, response: Response) {

  //try the execute function
  try {
   const { name, email, admin } = request.body
 
   const createUserService = new CreateUserService()
 
   const user = await createUserService.execute({ name, email, admin })
 
   return response.json(user)
   
  //error handling.
  } catch (error) {
   console.log(error)
   if (error) {
    return response.status(400).json(error.message)
   } 
  }
 }
}

export { CreateUserController }