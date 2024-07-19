import React from 'react';
import { Flex, chakra, useColorModeValue } from '@chakra-ui/react';

const ScheduleCard = (props) => {
  const { name, birth, datetime, status, conclusion } = props;

  const formattedDatetime = new Date(datetime).toLocaleString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Flex
      boxShadow={'lg'}
      maxW={'640px'}
      direction={{ base: 'column-reverse', md: 'row' }}
      width={'full'}
      rounded={'xl'}
      p={10}
      justifyContent={'space-between'}
      position={'relative'}
      bg={useColorModeValue('white', 'gray.800')}
      _after={{
        content: '""',
        position: 'absolute',
        height: '21px',
        width: '29px',
        left: '35px',
        top: '-10px',
        backgroundSize: 'cover',
      }}
      _before={{
        content: '""',
        position: 'absolute',
        zIndex: '-1',
        height: 'full',
        maxW: '640px',
        width: 'full',
        filter: 'blur(40px)',
        transform: 'scale(0.98)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        top: 0,
        left: 0,
      }}
    >
      <Flex direction={'column'} textAlign={'left'} justifyContent={'space-between'}>
        <chakra.p fontFamily={'Inter'} fontWeight={'medium'} fontSize={'15px'} pb={4}>
          Agendamento para {name}
        </chakra.p>
        <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
          Data e Hora:
          <chakra.span fontFamily={'Inter'} fontWeight={'medium'} color={'gray.500'}>
            {' '}{formattedDatetime}
          </chakra.span>
        </chakra.p>
        <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
          Data de Nascimento:
          <chakra.span fontFamily={'Inter'} fontWeight={'medium'} color={'gray.500'}>
            {' '}{birth}
          </chakra.span>
        </chakra.p>
        <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
          Status:
          <chakra.span fontFamily={'Inter'} fontWeight={'medium'} color={'gray.500'}>
            {' '}{status}
          </chakra.span>
        </chakra.p>
        <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
          Conclusão:
          <chakra.span fontFamily={'Inter'} fontWeight={'medium'} color={'gray.500'}>
            {' '}{conclusion || 'N/A'}
          </chakra.span>
        </chakra.p>
      </Flex>
    </Flex>
  );
};

export default ScheduleCard;
