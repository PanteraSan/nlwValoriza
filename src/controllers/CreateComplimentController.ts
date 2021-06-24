import { Request, Response } from 'express'
import { CreateComplimentService } from '../services/CreateComplimentService'

class CreateComplimentController {
 //main method
 async handle(request: Request, response: Response) {

   //getting properties of request body
   const { tagId, userSenderId, userReceiverId, message } = request.body

   //starting class to make use of its methods
   const createComplimentService = new CreateComplimentService()
 
   //starting a compliment to store the return
   const compliment = await createComplimentService.execute({ tagId, userSenderId, userReceiverId, message })
 
   //returning user to upper layer
   return response.json(compliment)
   
 }
}

export { CreateComplimentController }