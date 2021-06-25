import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../repositories/ComplimentRepositories"

class ListUserReceiveComplimentsService {

 async execute(userId) {
  const complimentRepository = getCustomRepository(ComplimentRepositories)

  const compliments = await complimentRepository.find({
   where: {
    userReceiverId: userId
   },
   relations: ["userSender", "userReceiver", "tag"]
  })

  return compliments

 }
}

export { ListUserReceiveComplimentsService }