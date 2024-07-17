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
} from '@chakra-ui/react'
import 'react-datepicker/dist/react-datepicker.css';
import BirthCalendar from '../components/BirthCalendar';
import DateTimeCalendar from '../components/DateTimeCalendar';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    name: z.string().min(2, "Preencha seu nome.").max(60, "Não exceda o limite de caracteres"),
    birth: z.string().refine((val) => {
        const [day, month, year] = val.split('/')
        const date = new Date(`${year}/${month}/${day}`)
        return !isNaN(date)
    }, {
        message: "Data inválida."
    }),
    datetime: z.string().refine((val) => {
        const date = new Date(val);
        return !isNaN(date);
    }, {
        message: "Dia e horário inválidos"
    })
});

export default function FormPage() {
    const { register, handleSubmit, formState, control, setValue } = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onBlur'
    });

    const submitForm = (data) => {
        console.log("SUBMIT", data);
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

                            <FormControl id="name" isRequired isInvalid={!!formState.errors.name}>
                                <FormLabel>Nome</FormLabel>
                                <Input focusBorderColor='cyan.400' {...register("name")} />
                                <FormErrorMessage>
                                    {formState.errors.name?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl id="birth" isRequired isInvalid={!!formState.errors.birth}>
                                <FormLabel>Data de Nascimento</FormLabel>
                                <Controller
                                    name="birth"
                                    control={control}
                                    render={({ field }) => (
                                        <BirthCalendar
                                            {...field}
                                            setValue={setValue}
                                            name="birth"
                                        />
                                    )}
                                />
                                <FormErrorMessage>
                                    {formState.errors.birth?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl id="datetime" isRequired isInvalid={!!formState.errors.birth}>
                                <FormLabel>Data e Hora do agendamento</FormLabel>
                                <Controller
                                    name="datetime"
                                    control={control}
                                    render={({ field }) => (
                                        <DateTimeCalendar
                                            {...field}
                                            setValue={setValue}
                                            name="datetime"
                                        />
                                    )}
                                />
                                <FormErrorMessage>
                                    {formState.errors.datetime?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <Stack spacing={10}>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    type="submit"
                                >
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
