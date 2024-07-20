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

const updateSchema = z.object({
    status: z.string().max(15),
    conclusion: z.string().max(40)
})

export default class Controller {


    store(request, response) {
        const { success, data, error } = attendanceSchema.safeParse(request.body);

        if (!success) {
            return response.status(400).send({ error });
        }

        const { name, birth, datetime } = data;

        const sameTimeAppointments = attendances.filter(item => item.datetime === datetime);

        if (sameTimeAppointments.length >= 2) {
            return response.status(400).send({ message: 'Horário indisponível.' });
        }

        const [date] = datetime.split('T');

        const sameDayAppointments = attendances.filter(item => item.datetime.startsWith(date));

        if (sameDayAppointments.length >= 20) {
            return response.status(400).send({ message: 'Não há vagas disponíveis para esse dia.' });
        }

        const [id] = crypto.randomUUID().split('-');

        attendances.push({
            id: id,
            name,
            birth,
            datetime,
            status: 'agendado',
            conclusion: null
        });

        return response.status(200).send({ message: 'Agendamento criado com sucesso.' });
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

        const { success, data, error } = updateSchema.safeParse(request.body)

        if (!success) {
            return response.status(400).send({ error });
        }

        const { status, conclusion } = data;

        const attendance = attendances.find(item => item.id === id)

        if (!attendance) {
            return response.status(404).send({ message: 'Agendamento não encontrado.' })
        }

        attendance.status = status || attendance.status
        attendance.conclusion = conclusion || attendance.conclusion

        return response.status(200).send({ message: 'Agendamento atualizado' })

    }


    destroy(request, response) {
        const { id } = request.params

        const index = attendances.findIndex(item => item.id === id)

        if (index === -1) {
            return response.status(404).send({ message: 'Agendamento não encontrado.' })
        }

        attendances.splice(index, 1)

        return response.status(200).send({ message: 'Agendamento removido com sucesso.' })
    }
}