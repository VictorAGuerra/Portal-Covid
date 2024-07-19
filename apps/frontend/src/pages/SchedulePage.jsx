'use client';

import React, { useEffect, useState } from 'react';
import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    useColorModeValue,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import AttendanceCard from '../components/AttendanceCard';
import { getAttendances } from '../../services/api.mjs';

export default function SchedulePage() {
    const [attendances, setAttendances] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAttendances, setFilteredAttendances] = useState([]);

    useEffect(() => {
        const fetchAttendances = async () => {
            try {
                const data = await getAttendances();
                setAttendances(data);
                setFilteredAttendances(data);
            } catch (error) {
                console.error('Erro ao obter agendamentos:', error);
            }
        };

        fetchAttendances();
    }, []);

    const convertToLocalTime = (dateTime) => {
        return new Date(dateTime).toLocaleString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).toLowerCase();
    };

    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = attendances.filter(appointment => {
            const localDateTime = convertToLocalTime(appointment.datetime);
            return localDateTime.includes(lowerCaseSearchTerm);
        });
        setFilteredAttendances(filtered);
    }, [searchTerm, attendances]);

    return (
        <Flex
            textAlign={'center'}
            pt={10}
            justifyContent={'center'}
            direction={'column'}
            width={'full'}
            overflow={'hidden'}
        >
            <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
                <chakra.h1
                    py={5}
                    fontSize={48}
                    fontFamily={'Work Sans'}
                    fontWeight={'bold'}
                    color={useColorModeValue('gray.700', 'gray.50')}
                >
                    Agendamentos
                </chakra.h1>
                <Text
                    margin={'auto'}
                    width={'70%'}
                    fontSize={'lg'}
                    fontFamily={'Inter'}
                    fontWeight={'medium'}
                    color={useColorModeValue('gray.500', 'gray.400')}
                >
                    Consulte aqui o seu agendamento
                </Text>
                <InputGroup mt={8}>
                    <InputLeftElement pointerEvents="none">
                        <FiSearch color="gray.300" />
                    </InputLeftElement>
                    <Input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        bg={useColorModeValue('gray.200', 'gray.600')}
                        color={useColorModeValue('gray.700', 'gray.50')}
                        placeholder='Pesquisar por dia ou horário'
                        _placeholder={{ color: useColorModeValue('gray.700', 'gray.50') }}
                        focusBorderColor='#0BC5E4'
                    />
                </InputGroup>
            </Box>
            <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={'20'} mt={16} mb={16} mx={'auto'}>
                {filteredAttendances.map((data, index) => (
                    <AttendanceCard key={index} {...data} index={index} />
                ))}
            </SimpleGrid>
        </Flex>
    );
}
