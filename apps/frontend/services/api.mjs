import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8888/api',
    timeout: 5000,
});

export const getAttendances = async () => {
    try {
        const response = await api.get('/attendance');
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erro ao obter agendamentos:', error);
        }
        throw error;
    }
};

export const createAttendance = async (attendance) => {
    try {
        const response = await api.post('/attendance', attendance);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erro ao criar agendamento:', error.response.data.message);
        }
        throw error;
    }
};

export const checkAvailability = async (date, time) => {
    try {
        const response = await api.get('/attendance/check', {
            params: {
                date,
                time,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao verificar disponibilidade:', error);
        throw error;
    }
};
