import { getCustomRepository } from 'typeorm'
import { ComplimentRepositories } from "../repositories/ComplimentRepositories"
import { UserRepositories } from '../repositories/UserRepositories'
import { ErrorHandler} from './../handlers/ErrorHandler' 

interface IComplimentRequest {
 tagId: string;
 userSenderId: string;
 userReceiverId: string;
 message: string
}

class CreateComplimentService {

 //main class method
 async execute({ tagId, userSenderId, userReceiverId, message }: IComplimentRequest) {
  //retrieving repository
  const complimentRepositories = getCustomRepository(ComplimentRepositories)
  const userRepositories = getCustomRepository(UserRepositories)
  
  const userReceiverExists = await userRepositories.findOne(userReceiverId)
 
  if (userReceiverId === userSenderId) {
   //throw error object to upper layer with custom parameters
   const err = {
    name: 'SameUsersError',
    message: 'Receiver and Sender are the same Ids',
    statusCode: 418,
    description: "Receiver and sender ids are the same. Don't try to cheat =)"
   }

   throw new ErrorHandler(err)
  }

  if(!userReceiverExists) {

   //throw error object to upper layer with custom parameters
   const err = {
    name: 'ReceiverDontExistsError',
    message: "User receiver doesn't exists",
    statusCode: 419,
    description: "User receiver doesn't exists. Try to compliment an existant person next time."
   }

   throw new ErrorHandler(err)
  }

  const compliment = complimentRepositories.create({ tagId, userReceiverId, userSenderId, message }) 

  await complimentRepositories.save(compliment)

  return compliment
 }
}

export { CreateComplimentService }