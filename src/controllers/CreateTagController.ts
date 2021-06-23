import { Request, Response } from 'express'
import { CreateTagService } from '../services/CreateTagService'

class CreateTagController {
 //main method
 async handle(request: Request, response: Response) {

   //getting properties of request body
   const { name } = request.body
 
   //starting class to make use of its methods
   const createUserService = new CreateTagService()
 
   //starting a tag to store the return
   const tag = await createUserService.execute( name )
 
   //returning user to upper layer
   return response.json(tag)
   
 }
}

export { CreateTagController }