import { Request, Response } from 'express'
import { CreateComplimentService } from '../services/CreateComplimentService'

class CreateComplimentController {
 //main method
 async handle(request: Request, response: Response) {

   //getting properties of request body
   const { tagId, userReceiverId, message } = request.body
   const { userId } = request

   //starting class to make use of its methods
   const createComplimentService = new CreateComplimentService()
 
   //starting a compliment to store the return
   const compliment = await createComplimentService.execute({ 
     tagId, 
     userSenderId: userId, 
     userReceiverId, 
     message 
    })
 
   //returning user to upper layer
   return response.json(compliment)
   
 }
}

export { CreateComplimentController }