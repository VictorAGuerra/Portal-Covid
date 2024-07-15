import { Router } from 'express'
import Controller from '../controller/controller.mjs'

const router = Router()

const controller = new Controller()

router.post('/api/attendance', (request, response) =>
    controller.store(request, response)
)

router.get('/api/attendance', (request, response) =>
    controller.index(request, response)
)

router.get('/api/attendance/:id', (request, response) =>
    controller.getOne(request, response)
)

router.put('/api/attendance/:id', (request, response) =>
    controller.update(request, response)
)

router.delete('/api/attendance/:id', (request, response) =>
    controller.destroy(request, response)
)

export default router