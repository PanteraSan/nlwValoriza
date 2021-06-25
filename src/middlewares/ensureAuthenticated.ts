import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { ErrorHandler } from '../handlers/ErrorHandler'

interface IPayload {
  sub: string
}

export function ensureAuthenticated(
 request: Request, response: Response, next: NextFunction
 ) {

  //receive token
  const authToken = request.headers.authorization 

  //check if authToken is filled
  if (authToken == "") {
      //throw error object to upper layer with custom parameters
      const err = {
       name: 'MissingTokenError',
       message: 'Missing token',
       statusCode: 401,
       description: 'Missing token on request.'
      }
   
      throw new ErrorHandler(err)
  }

  const [ , token] = authToken.split(' ')

  try {

   const { sub } = verify(token, 'bbeb2a51754fc61b9896207ef3b0dc65') as IPayload

   request.userId = sub
   
   return next()

  } catch (error) {
   if (error) {
    //throw error object to upper layer with custom parameters
    const err = {
     name: 'BadTokenFormat',
     message: 'Invalid token format',
     statusCode: 401,
     description: 'Cannot validate the received token.'
    }
 
    throw new ErrorHandler(err)
   } else return response.status(500).end()
  } 
  
  //check if token is valid
  
  
  //recover user info
  
}