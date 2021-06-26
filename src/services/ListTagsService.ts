import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"
import { classToPlain } from 'class-transformer'


class ListTagsService {
 async execute() {
  const tagRepositories = getCustomRepository(TagsRepositories)

  /**using map to return formatted tag name to upper layer
   let tags = await tagRepositories.find()
   tags = tags.map((tag) => ({ ...tag, customNameTag: `#${tag.name}` }))
   
   return tags
   */

   const tags = await tagRepositories.find()


   return classToPlain(tags)
 }
}

export { ListTagsService }