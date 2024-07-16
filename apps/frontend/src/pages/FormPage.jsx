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
} from '@chakra-ui/react'
import 'react-datepicker/dist/react-datepicker.css';
import BirthCalendar from '../components/BirthCalendar';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';


export default function FormPage() {
    const [form, setForm] = useForm()

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
                    <Stack spacing={4}>

                        <FormControl id="name">
                            <FormLabel>Nome</FormLabel>
                            <Input type="text" focusBorderColor='cyan.400'/>
                        </FormControl>

                        <FormControl id="birth">
                            <FormLabel>Data de Nascimento</FormLabel>
                            <BirthCalendar
                            onChange={console.log('oi')}
                            />
                        </FormControl>

                        <Stack spacing={10}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Enviar
                            </Button>
                        </Stack>

                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}
