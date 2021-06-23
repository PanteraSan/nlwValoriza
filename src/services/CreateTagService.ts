import { getCustomRepository } from 'typeorm'
import { TagsRepositories } from "../repositories/TagsRepositories"
import { ErrorHandler} from './../handlers/ErrorHandler' 

class CreateTagService {

 //main class method
 async execute( name : string) {
  //retrieving repository
  const tagsRepositories = getCustomRepository(TagsRepositories)

  //check valid name
  if (!name || name === '') {
   //throw error object to upper layer with custom parameters
   const err = {
    name: 'TagNameError',
    message: 'invalid tag name',
    statusCode: 418,
    description: 'Tag name is invalid. Please check if your name are being sent or is not null'
   }

   throw new ErrorHandler(err)
  }

  //check if tag already exists on db
  const tagAlreadExists = await tagsRepositories.findOne({ name })

  if (tagAlreadExists) {
   //throw error object to upper layer with custom parameters
   const err = {
    name: 'TagAlreadyExistsError',
    message: 'tag already registered',
    statusCode: 419,
    description: 'Tag is already registered. Please inform another tag'
   }

   throw new ErrorHandler(err)
 
  }

  //if nothing bad happens, finish to create tag and save on db
  const tag = tagsRepositories.create({ name })

  await tagsRepositories.save(tag)

  //return tag to upper layer
  return tag
 }

}

export { CreateTagService }