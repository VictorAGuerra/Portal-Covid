import React from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormErrorMessage,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTimeCalendar from '../components/DateTimeCalendar';
import BirthCalendar from '../components/BirthCalendar';
import { createAttendance } from '../../services/api';
import { useNotification } from '../context/NotificationContext';

const formSchema = z.object({
    name: z.string().min(2, "Preencha seu nome").max(60),
    birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
    datetime: z.string().nonempty("Data e hora são obrigatórias"),
});

export default function FormPage() {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onChange'
    });

    const { showNotification } = useNotification();

    const submitForm = async (data) => {
        try {
            const response = await createAttendance(data);
            showNotification('Agendamento criado com sucesso!', 'success');
            console.log(response);
        } catch (error) {
            showNotification(error.response.data.message, 'error');
            console.error(error);
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Preencha o formulário</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        para fazer seu agendamento
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <Stack spacing={4}>
                            <FormControl id="name" isRequired isInvalid={!!errors.name}>
                                <FormLabel>Nome</FormLabel>
                                <Input focusBorderColor='cyan.400' {...register("name")} />
                                <FormErrorMessage>
                                    {errors.name?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl id="birth" isRequired isInvalid={!!errors.birth}>
                                <FormLabel>Data de Nascimento</FormLabel>
                                <Controller
                                    control={control}
                                    name="birth"
                                    render={({ field: { onChange, value, ref } }) => (
                                        <BirthCalendar
                                            setValue={(name, value) => onChange(value)}
                                            name="birth"
                                            ref={ref}
                                        />
                                    )}
                                />
                                <FormErrorMessage>
                                    {errors.birth?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl id="datetime" isRequired isInvalid={!!errors.datetime}>
                                <FormLabel>Data e Hora do Agendamento</FormLabel>
                                <Controller
                                    control={control}
                                    name="datetime"
                                    render={({ field: { onChange, value, ref } }) => (
                                        <DateTimeCalendar
                                            setValue={(name, value) => onChange(value)}
                                            name="datetime"
                                            ref={ref}
                                        />
                                    )}
                                />
                                <FormErrorMessage>
                                    {errors.datetime?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <Stack spacing={10}>
                                <Button
                                    type="submit"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Enviar
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}
