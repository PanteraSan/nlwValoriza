import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import { router } from './routes'

import './database'
import { ErrorHandler } from './handlers/ErrorHandler'

const app = express()

app.use(express.json())

app.use(router)

app.use( (err: ErrorHandler, request: Request, response: Response, next: NextFunction) => {
 if (err instanceof ErrorHandler) {
  const { name, message, description, statusCode } = err

  return response.status(statusCode).json( {name, message, description} )
 }

 return response.status(500).json({ 
  status: 'error',
  message: 'Internal Server Error!'
  })

})

// http://localhost:3000
app.listen(3000, () => console.log('Server is running on port 3000'))