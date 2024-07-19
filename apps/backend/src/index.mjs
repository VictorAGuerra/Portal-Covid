import express from 'express'
import router from './router/router.mjs'
import cors from 'cors'

const server = express()

server.use(cors())
server.use(express.json())
server.use(router)

const PORT = process.env.PORT || 8888

server.use('*', (request, response) => {
    response.status(404).send({message: 'Route not found.'})
})

server.listen(PORT, ()  => {console.log(`Server is listening on port ${PORT},`)})