import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../repositories/ComplimentRepositories"

class ListUserSendComplimentsService {

 async execute(userId) {
  const complimentRepository = getCustomRepository(ComplimentRepositories)

  const compliments = await complimentRepository.find({
   where: {
    userSenderId: userId
   }
  })

  return compliments

 }
}

export { ListUserSendComplimentsService }