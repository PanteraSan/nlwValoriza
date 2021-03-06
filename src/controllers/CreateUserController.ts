import { Request, Response } from 'express'
import { CreateUserService } from '../services/CreateUserService'

class CreateUserController {
 //main method
 async handle(request: Request, response: Response) {

   //getting properties of request bodyyarn 
   const { name, email, admin, password } = request.body
 
   //starting class to make use of its methods
   const createUserService = new CreateUserService()
 
   //starting a user to store the return
   const user = await createUserService.execute({ name, email, admin, password })
 
   //returning user to upper layer
   return response.json(user)
   
 }
}

export { CreateUserController }