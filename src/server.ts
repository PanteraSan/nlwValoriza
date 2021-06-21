import express, { response } from 'express'

const app = express()

app.use(express.json())

/**
 * GET => buscar uma informação
 * POST => inserir ou criar uma informação
 * PUT => alterar uma informação
 * DELETE => remover um dado
 * PATCH => alterar alguma informação específica
 * 
 */

app.get('/', (req, res) => {
 return res.json({ message: 'Hello NLW World!' })
})

app.post('/test-post', (req, res) => {
 return res.json({ message: 'Accessing POST method' })
})

// http://localhost:3000
app.listen(3000, () => console.log('Server is running on port 3000'))