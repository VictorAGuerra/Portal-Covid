import { z } from 'zod'
import crypto from 'node:crypto'


const attendances = []

const attendanceSchema = z.object({
    name: z.string().min(2).max(60),
    birth: z.string().refine((val) => {
        const [day, month, year] = val.split('/')
        const date = new Date(`${year}/${month}/${day}`)
        return !isNaN(date)
    }),
    datetime: z.string().refine((val) => {
        const date = new Date(val);
        return !isNaN(date);
    })
});

export default class Controller {

    
    store(request, response) {

        const {success, data, error} = attendanceSchema.safeParse(request.body)

        const [id] = crypto.randomUUID().split('-')

        if (!success) {
            return response.status(400).send(error)
        }

        attendances.push({
            id: id,
            ...data,
            status: 'agendado',
            conclusion: null,
        })

        return response.status(200).send({ message: 'Agendamento criado com sucesso.' })
    }


    index(request, response) {
        response.status(200).send(attendances)
    }


    getOne(request, response) {
        const { id } = request.params
    
        const attendance = attendances.find(item => item.id === id)
    
        if (!attendance) {
            return response.status(404).send({ message: 'Agendamento não encontrado.' })
        }
    
        return response.status(200).send(attendance)
    }


    update(request, response) {
        const { id } = request.params

        const { status } = request.body

        const attendance = attendances.find(item => item.id === id)

        if (!attendance) {
            return response.status(404).send({ message: 'Agendamento não encontrado.' })
        }

        attendance.status = status || attendance.status

        return response.status(200).send({ message: 'Agendamento atualizado'})

    }


    destroy(request, response) {
        const { id } = request.params

        const index = attendances.findIndex(item => item.id === id)

        if (index === -1) {
            return response.status(404).send({ message: 'Agendamento não encontrado.' })
        }

        attendances.splice(index, 1)
        
        return response.status(200).send({ message: 'Agendamento removido com sucesso.'})
    }
}